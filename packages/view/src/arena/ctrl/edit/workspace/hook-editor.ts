import { default_editer_option } from '@/plugin/monaco-editer/option'
import { node_use$ } from '@/source/node/base'
import { get_cur_book_src } from '@/source/book'
import { node_text_saver$, node_text_from_fs$ } from '@/source/node/txt'
import { editer_setting$ } from '@/subject'
import { debounceTime, filter, take, tap, switchMap } from 'rxjs/operators'
import { zen$, size$, etbottom$, ettop$ } from './subj'
import { monaco_option_use$, monaco_position$ } from '@/subject/monaco'
import { useEffect } from 'react'
import { sensitive_editor_resover$, sensitive_can_check$ } from '@/subject/sensitive'
import { mk_npc_reg } from '@/source/npc/method'
import { npc_li$, npc_use_id$ } from '@/source/npc'
import { next_router } from '@/router/router'
import { edit_2_npc$, search_2_edit$ } from '@/subject/go-to'
import { search_text$ } from '@/subject/search'

export function useEditor(ref: React.MutableRefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const options = default_editer_option()
        const editor = monaco.editor.create(dom, options)
        editor.focus()

        editor.onKeyUp((e) => {
            on_key_up(editor, e)
        })
        editor.onMouseDown((e) => {
            on_mouse_down(editor, e)
        })

        // 切换节时
        const ob_change_node = node_use$.subscribe(() => {
            editor.revealLine(0) // 滚动到第一行
        })
        // 自动大小
        const ob_size = size$.subscribe((o) => {
            const layout = o.eset.editer.editer_layout
            const wh = {
                width: ((dom.clientWidth * layout.width) / 100) | 0,
                height: ((dom.clientHeight * layout.height) / 100) | 0,
            }
            editor.layout(wh)
        })
        // 观察应用配置: 主题,
        const ob_app = editer_setting$.subscribe((t) => {
            monaco.editor.setTheme(t.common.theme)
        })
        /** monaco配置
         * 因为链了编辑器设置, 所以加个抖动
         */
        const ob_opt = monaco_option_use$.pipe(debounceTime(100)).subscribe((opt) => {
            editor.updateOptions(opt)
            editor.render()
        })
        // 文本, 加一个延迟是为了缩放后, 切到别的页面切回来不闪一下
        const ob_txt = node_text_from_fs$.pipe(debounceTime(50)).subscribe((t) => {
            editor.setValue(t)
        })
        // 编辑器向下一屏
        const ob_scroll_bottom = etbottom$.subscribe(() => {
            const lineh = editor.getRawOptions().lineHeight || 26
            const t = editor.getScrollTop()
            const h = editor.getLayoutInfo().height
            const next_h = ((((t + h) / lineh) | 0) - 1) * lineh
            editor.setScrollTop(next_h)
        })
        // 编辑器向上一屏
        const ob_scroll_top = ettop$.subscribe(() => {
            const lineh = editor.getRawOptions().lineHeight || 26
            const t = editor.getScrollTop()
            const h = editor.getLayoutInfo().height
            const next_h = ((((t - h) / lineh) | 0) + 1) * lineh
            editor.setScrollTop(next_h)
        })
        // 从别处传来的位置
        const ob_pos = monaco_position$.subscribe((pos) => {
            const range = new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column)
            editor.setSelection(range)
            editor.focus()
            editor.setPosition(pos)
            editor.revealPositionInCenter(pos, 0)
        })
        // 推入敏感词检查
        const ob_check = sensitive_can_check$.pipe(filter(Boolean), debounceTime(500)).subscribe(() => {
            sensitive_editor_resover$.next(editor)
        })
        // 从搜索页跳转来的, 自动搜索
        const ob_search = search_2_edit$
            .pipe(
                take(1),
                filter(Boolean),
                tap(() => {
                    search_2_edit$.next(false)
                }),
                switchMap(() => search_text$),
                debounceTime(200),
                take(1),
            )
            .subscribe((txt) => {
                const m = editor.getModel()
                if (!m) {
                    return
                }

                const fs = m.findMatches(txt, false, false, true, null, true)
                if (fs.length) {
                    const f = fs[0]
                    const range = f.range
                    const p = range.getStartPosition()
                    editor.setSelection(range)
                    editor.setPosition(p)
                    editor.revealPosition(p)
                }
            })
        return () => {
            editor.dispose()
            ob_txt.unsubscribe()
            ob_size.unsubscribe()
            ob_app.unsubscribe()
            ob_change_node.unsubscribe()
            ob_scroll_bottom.unsubscribe()
            ob_scroll_top.unsubscribe()
            ob_opt.unsubscribe()
            ob_pos.unsubscribe()
            ob_check.unsubscribe()
            ob_search.unsubscribe()
        }
    }, [ref])
}

function on_key_up(editor: monaco.editor.IStandaloneCodeEditor, event: monaco.IKeyboardEvent) {
    // 回车时, 自动添加段首空格
    console.log(event.code, 'event.code')

    if (event.code === 'Enter' && event.altKey) {
        const editerset = editer_setting$.value.table_size ?? 2
        if (!editerset) {
            return
        }
        const prefix = Array(editerset)
            .fill('\u3000')
            .join('')
        const t = editor.getValue()
        const t1 = t
            .split(/\n+[\x7F-\xA0\u1680\u180E\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*/)
            .map((l) =>
                l
                    .replace(/^[\s\u3000]*/, prefix)
                    .replace(/^/, '\n')
                    .replace(/\s+$/, ''),
            )
            .join('\n')
            .replace(/^\n*[\x7F-\xA0\u1680\u180E\u2000-\u200B\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n*/, prefix)
            .trimEnd()
        editor.setValue(t1)
        editor.focus()
    }
    const t = editor.getValue()
    const node = node_use$.value
    const book_src = get_cur_book_src()
    if (node) {
        if (book_src) {
            // 存储保存需要的资料
            node_text_saver$.next({
                book_src: book_src,
                node_id: node.id,
                text: t,
                node_name: node.name,
            })
        }
    } else {
        // alert('当前没有选中节, 无法保存编辑内容')
        editor.setValue('当前没有选中节, 无法保存编辑内容')
    }
    // 推入敏感词检查
    sensitive_editor_resover$.next(editor)
}

function on_mouse_down(editor: monaco.editor.IStandaloneCodeEditor, event: monaco.editor.IEditorMouseEvent) {
    const model = editor.getModel()
    const pos = event.target.position
    const ne = event.event

    if (!pos || !model || !ne.ctrlKey) {
        return
    }
    const str = model.getWordAtPosition(pos)
    if (!str) {
        return
    }
    // 先查找角色
    const npc_reg = mk_npc_reg()
    const npc_m = str.word.match(npc_reg)
    if (npc_m) {
        const f = npc_m[0]
        const npc_f = npc_li$.value.find((v) => v.base.name === f)
        if (!npc_f) {
            return
        }
        npc_use_id$.next(npc_f.id)
        edit_2_npc$.next(true)
        next_router('npc', 'edit')
        return
    }
}
