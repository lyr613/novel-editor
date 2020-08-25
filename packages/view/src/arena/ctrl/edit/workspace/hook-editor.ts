import { default_editer_option } from '@/plugin/monaco-editer/option'
import * as monaco from 'monaco-editor'
import { editer$ } from '../subj'
import { node_use$ } from '@/source/node/base'
import { get_cur_book_src } from '@/source/book'
import { check_words$ } from './util'
import { node_text_saver$, node_text_from_fs$ } from '@/source/node/txt'
import { editer_setting$ } from '@/subject'
import { merge } from 'rxjs/operators'
import { Screen$ } from '@/subscribe'
import { debounceTime } from 'rxjs/operators'
import { zen$, size$, etbottom$, ettop$ } from './subj'
import { monaco_option_use$ } from '@/subject/monaco'
import { useEffect } from 'react'

export function useEditor(ref: React.MutableRefObject<HTMLDivElement | null>) {
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const options = default_editer_option()
        const editor = monaco.editor.create(dom, options)
        editer$.next(editor)

        editor.onKeyUp((e) => {
            on_key_up(editor, e)
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
            check_words$.next(editor)
        })
        // 编辑器向下一屏
        const ob_scroll_bottom = etbottom$.subscribe(() => {
            const t = editor.getScrollTop()
            const ly = editor.getLayoutInfo().height
            editor.setScrollTop(t + ly - 20)
        })
        // 编辑器向上一屏
        const ob_scroll_top = ettop$.subscribe(() => {
            const t = editor.getScrollTop()
            const ly = editor.getLayoutInfo().height
            editor.setScrollTop(t - ly + 20)
        })
        return () => {
            // 自动保存
            editor.dispose()
            ob_txt.unsubscribe()
            ob_size.unsubscribe()
            ob_app.unsubscribe()
            ob_change_node.unsubscribe()
            ob_scroll_bottom.unsubscribe()
            ob_scroll_top.unsubscribe()
            ob_opt.unsubscribe()
        }
    }, [ref])
}

function on_key_up(editor: monaco.editor.IStandaloneCodeEditor, event: monaco.IKeyboardEvent) {
    const t = editor.getValue()
    const node = node_use$.value
    const book_src = get_cur_book_src()
    if (node) {
        check_words$.next(editor) // 检查敏感词
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
}
