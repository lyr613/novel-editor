// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { Icon, Slider, Label } from 'office-ui-fabric-react'
import * as monaco from 'monaco-editor'
import {
    node_focu$,
    node_text_from_fs$,
    node_focu_buffer$,
    node_text_from_editer$,
    node_id_text_map$,
    book_use$,
    find_node_text_from_fs_auto,
} from '@/source'
import { useObservable } from 'rxjs-hooks'
import { map, switchMap, merge, debounceTime } from 'rxjs/operators'
import { Screen$, key$ } from '@/subscribe'
import { editer$ } from '../subj'
import { editer_setting$ } from '@/subject'
import useScroll from '@/hook/scroll-hock'
import { zen$, etbottom$, ettop$, etnext$, etprev$ } from './subj'
import { shallowCopy } from '@/rx/shallow-copy'
import { check_words$ } from './util'
import CtrlBar from './ctrl-bar'
import { search_text$ } from '@/subject/search'
import { default_editer_option } from '@/plugin/monaco-editer/option'
import { monaco_option_use$ } from '@/subject/monaco'

interface p {
    w: number
    h: number
}

export default function Workspace(p: p) {
    const be_zen = useObservable(() => zen$)
    const zencls = be_zen ? s.zenmodel : s.commonmodel
    return (
        <div
            className={s.Workspace}
            style={{
                width: p.w + 'px',
                height: p.h + 'px',
            }}
        >
            <Head />
            <div className={zencls}>
                <CtrlBar />
                <Write />
            </div>
        </div>
    )
}

/** 活动节, 最多5个 */
function Head() {
    const li = useObservable(() => node_focu_buffer$, [])
    const focu = useObservable(() => node_focu$)

    const ref_box = useRef<null | HTMLUListElement>(null)
    useScroll(ref_box, 'w')
    return (
        <ul className={[s.Head, 'no-scroll'].join(' ')} ref={ref_box}>
            {li.map((nd) => (
                <li
                    className={[s.one, focu?.id === nd.id ? s.focu : ''].join(' ')}
                    key={nd.id}
                    onClick={() => {
                        node_focu$.next(nd)
                    }}
                >
                    <span className={s.name}>{nd.name}</span>
                    <Icon
                        iconName="Cancel"
                        className={s.icon}
                        onClick={(e) => {
                            e.stopPropagation()
                            const i = node_focu_buffer$.value.findIndex((v) => v.id === nd.id)
                            const arr = node_focu_buffer$.value.filter((v) => v.id !== nd.id)
                            node_focu_buffer$.next(arr)
                            if (nd.id === focu?.id) {
                                const ni = Math.max(0, i - 1)
                                node_focu$.next(arr[ni] || null)
                            }
                        }}
                    ></Icon>
                </li>
            ))}
        </ul>
    )
}

/** 编辑区 */
function Write() {
    const ref = useRef<null | HTMLDivElement>(null)

    // 提供给边框用
    const [w, set_w] = useState(0)
    const [h, set_h] = useState(0)
    const ESet = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const transform = ESet?.editer.editer_transform

    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const options = default_editer_option()
        const editer = monaco.editor.create(dom, options)
        editer$.next(editer)

        editer.onKeyUp(() => {
            const t = editer.getValue()
            node_text_from_editer$.next(t)
            const node = node_focu$.value
            const book = book_use$.value
            if (node) {
                check_words$.next(editer) // 检查敏感词
                if (book?.src) {
                    // 存储保存需要的资料
                    const m = node_id_text_map$.value
                    m.set(node.id, {
                        book_src: book.src,
                        node_id: node.id,
                        text: t,
                        node_name: node.name,
                    })
                    node_id_text_map$.next(m)
                }
            } else {
                alert('当前没有选中节, 无法保存编辑内容')
            }
        })
        // 切换节时
        const ob_change_node = node_focu$.subscribe(() => {
            editer.revealLine(0) // 滚动到第一行
            find_node_text_from_fs_auto() // 更新文本内容
        })
        // 自动大小
        const ob = editer_setting$
            .pipe(merge(Screen$.pipe(debounceTime(500))), merge(zen$.pipe(debounceTime(500))))
            .subscribe(() => {
                const layout = editer_setting$.value.editer.editer_layout
                const o = {
                    width: ((dom.clientWidth * layout.width) / 100) | 0,
                    height: ((dom.clientHeight * layout.height) / 100) | 0,
                }
                set_w(o.width)
                set_h(o.height)
                editer.layout(o)
            })
        // 观察应用配置
        const ob_app = editer_setting$.subscribe((t) => {
            monaco.editor.setTheme(t.common.theme)
        })
        /** monaco配置
         * 因为链了编辑器设置, 所以加个抖动
         */
        const ob_opt = monaco_option_use$.pipe(debounceTime(100)).subscribe((opt) => {
            editer.updateOptions(opt)
            editer.render()
        })
        // 文本, 加一个延迟是为了缩放后, 切到别的页面切回来不闪一下
        const ob_t = node_text_from_fs$.pipe(debounceTime(50)).subscribe((t) => {
            editer.setValue(t)
            check_words$.next(editer)
        })
        // 编辑器向下滚动
        const ob_scroll_bottom = etbottom$.subscribe(() => {
            const t = editer.getScrollTop()
            const ly = editer.getLayoutInfo().height
            editer.setScrollTop(t + ly - 20)
        })
        // 编辑器向上滚动
        const ob_scroll_top = ettop$.subscribe(() => {
            const t = editer.getScrollTop()
            const ly = editer.getLayoutInfo().height
            editer.setScrollTop(t - ly + 20)
        })
        return () => {
            // 自动保存
            editer.dispose()
            ob_t.unsubscribe()
            ob.unsubscribe()
            ob_app.unsubscribe()
            ob_change_node.unsubscribe()
            ob_scroll_bottom.unsubscribe()
            ob_scroll_top.unsubscribe()
            ob_opt.unsubscribe()
        }
    }, [])
    useEffect(() => {
        // 快捷键, 滚动
        const ob_key = key$.subscribe((k) => {
            if (!(k.alt && !k.ctrl && !k.shift)) {
                return
            }
            // alt 1
            if (k.code === 49) {
                etbottom$.next()
            }
            if (k.code === 50) {
                etnext$.next()
            }
            if (k.code === 51) {
                etprev$.next()
            }
            // alt 4
            if (k.code === 52) {
                ettop$.next()
            }
        })
        return () => ob_key.unsubscribe()
    }, [])
    return (
        <div
            className={s.Write}
            style={{
                transform: `translate(${transform?.width ?? 0}px, ${transform?.height ?? 0}px)`,
            }}
        >
            <div className={s.editer} ref={ref}></div>
            <div
                className={s.outline}
                style={{
                    width: w + 'px',
                    height: h + 'px',
                }}
            ></div>
            <div
                className={s.readctrl}
                style={{
                    // left: `calc(50% - ${w / 2}px)`,
                    width: w + 'px',
                    transform: `translate(-50%, ${(h / 2) | 0}px)`,
                }}
            >
                <div
                    title="alt/command 3"
                    className={s.onec}
                    onClick={() => {
                        etprev$.next()
                    }}
                >
                    ←
                </div>
                <div
                    title="alt/command 4"
                    className={s.onec}
                    onClick={() => {
                        ettop$.next()
                    }}
                >
                    ↑
                </div>
                <div
                    title="alt/command 1"
                    className={s.onec}
                    onClick={() => {
                        etbottom$.next()
                    }}
                >
                    ↓
                </div>
                <div
                    title="alt/command 2"
                    className={s.onec}
                    onClick={() => {
                        etnext$.next()
                    }}
                >
                    →
                </div>
            </div>
        </div>
    )
}
