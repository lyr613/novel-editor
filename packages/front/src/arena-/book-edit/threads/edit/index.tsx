import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { SubThreads } from 'subject-/threads'
import { shallowCopy } from 'tool-/rx-shallow-copy'
import { DefaultButton, IconButton, Label, PrimaryButton, Slider, TextField } from '@fluentui/react'
import { map, switchMap } from 'rxjs/operators'
import { StyleTheme } from 'style-/theme'
import DialogOneCol, {
    DialogOneColConfirmHook$,
    DialogOneColLiGetter$,
    DialogOneColShow$,
    DialogOneColTitle$,
} from 'component-/dialog-one-col'
import { ToolTranData } from 'tool-/tran-data'
import { StyleMake } from 'style-/global'
import LabelHelp from 'component-/label-help'

const ids = {
    box: 'threads-canvas-box',
    cns_static: 'threads-canvas-static',
    cns_edit: 'threads-canvas-edit',
}

/**
 */
export default function ThreadsEdit() {
    return (
        <div className={css(style.ThreadsEdit)}>
            <ThreadsCanvas />
            <Ctrl />
            <DialogOneCol />
        </div>
    )
}

function ThreadsCanvas() {
    const editing_item = useObservable(() => SubThreads.editing_item$.pipe(shallowCopy()), null)

    const [canvas_w, next_canvas_w] = useState(0)
    const [canvas_h, next_canvas_h] = useState(0)
    const [item_li, next_item_li] = useState([] as threads_item_vo[])
    const ref_cns = useRef(null as null | HTMLCanvasElement)
    useEffect(() => {
        const ob = SubThreads.obj$
            .pipe(
                switchMap((obj) =>
                    SubThreads.editing_item$.pipe(
                        map((edit) => ({
                            obj,
                            edit,
                        })),
                    ),
                ),
            )
            .subscribe((o) => {
                const { obj, edit } = o
                const li = obj.items
                const show_li = li.filter((v) => v.id !== edit?.id)
                next_item_li(show_li)
                //
                setTimeout(() => {
                    const box_div = document.getElementById(ids.box)!
                    const [dw, dh] = [box_div.clientWidth, box_div.clientHeight]
                    const w = Math.max(dw, obj.canvas.width)
                    const h = Math.max(dh, obj.canvas.height)
                    next_canvas_w(w)
                    next_canvas_h(h)
                    // 这里没必要推送, 也避免重新渲染
                    obj.canvas.width = w
                    obj.canvas.height = h
                }, 100)
            })
        return () => ob.unsubscribe()
    }, [])
    // 静态线索的画布
    useEffect(() => {
        const dom = ref_cns.current
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!
        const obli = SubThreads.static_items$.subscribe((li) => {
            cns.clearRect(0, 0, dom.clientWidth, dom.clientHeight)
            const mmm = ToolTranData.li2map(li)
            li.forEach((it) => {
                it.nexts.forEach((id) => {
                    const it2 = mmm.get(id)
                    if (it2) {
                        const l = new Path2D()
                        l.moveTo(it.x, it.y)
                        l.lineTo(it2.x, it2.y)
                        cns.stroke(l)
                    }
                })
            })
        })
        return () => {
            obli.unsubscribe()
            cns.clearRect(0, 0, dom.clientWidth, dom.clientHeight)
        }
    }, [canvas_w, canvas_h])
    // 编辑线索的画布
    useEffect(() => {
        const dom = document.getElementById(ids.cns_edit) as HTMLCanvasElement
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!
        const ob = SubThreads.editing_item$.subscribe((edit) => {
            cns.clearRect(0, 0, dom.clientWidth, dom.clientHeight)
            if (!edit) {
                return
            }
            const li = SubThreads.obj$.value.items
            const mmm = ToolTranData.li2map(li)

            edit.nexts.forEach((id2) => {
                const it2 = mmm.get(id2)
                // console.log(it2, 'it2')
                if (!it2) {
                    return
                }
                const l = new Path2D()
                l.moveTo(edit.x, edit.y)
                l.lineTo(it2.x, it2.y)
                cns.stroke(l)
            })
            const link_self = li.filter((v) => v.nexts.includes(edit.id))
            link_self.forEach((it2) => {
                // console.log(it2, 'it2')
                const l = new Path2D()
                l.moveTo(edit.x, edit.y)
                l.lineTo(it2.x, it2.y)
                cns.stroke(l)
            })
        })
        return () => {
            ob.unsubscribe()
            cns.clearRect(0, 0, dom.clientWidth, dom.clientHeight)
        }
    }, [canvas_w, canvas_h])
    return (
        <div className={css(style.ThreadsCanvas)} id={ids.box}>
            {editing_item && (
                <div
                    className={css(style.ThreadsCanvasItem)}
                    style={{
                        left: editing_item.x + 'px',
                        top: editing_item.y + 'px',
                        backgroundColor: StyleTheme.style_vars.themeTertiary,
                    }}
                >
                    {editing_item.name}
                </div>
            )}
            {item_li.map((it) => (
                <div
                    key={it.id}
                    className={css(style.ThreadsCanvasItem)}
                    style={{
                        left: it.x + 'px',
                        top: it.y + 'px',
                    }}
                    onClick={() => {
                        SubThreads.editing_item$.next(it)
                    }}
                >
                    {it.name}
                </div>
            ))}
            {canvas_w && (
                <canvas
                    id={ids.cns_static}
                    ref={ref_cns}
                    width={canvas_w}
                    height={canvas_h}
                    style={{
                        width: canvas_w,
                        height: canvas_h,
                    }}
                ></canvas>
            )}
            {canvas_w && (
                <canvas
                    id={ids.cns_edit}
                    width={canvas_w}
                    height={canvas_h}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        zIndex: 0,
                        width: canvas_w,
                        height: canvas_h,
                    }}
                ></canvas>
            )}
        </div>
    )
}

function Ctrl() {
    const editing_item = useObservable(() => SubThreads.editing_item$.pipe(shallowCopy()), null)
    const static_items = useObservable(() => SubThreads.static_items$, [])
    const [cns_w, next_cns_w] = useState(0)
    const [cns_h, next_cns_h] = useState(0)
    const m_static = ToolTranData.li2map(static_items)
    const links = (editing_item?.nexts ?? [])
        .filter((id) => m_static.get(id))
        .map((id) => {
            const it = m_static.get(id)!
            return it
        })
    useEffect(() => {
        const t = setInterval(() => {
            const dom = document.getElementById(ids.cns_static)
            if (dom) {
                next_cns_w(dom.clientWidth)
                next_cns_h(dom.clientHeight)
            }
        }, 1000)
        return () => {
            clearInterval(t)
        }
    }, [])
    if (editing_item === null) {
        return (
            <div className={css(style.Ctrl)}>
                <DefaultButton
                    onClick={() => {
                        const it = SubThreads.make_item()
                        const box_div = document.getElementById(ids.box)!
                        const cns_dom = document.getElementById(ids.cns_static)!
                        if (cns_dom.clientWidth > window.innerWidth) {
                            it.x = (window.innerWidth / 2 + box_div.scrollLeft) | 0
                        } else {
                            it.x = (window.innerWidth / 2) | 0
                        }
                        it.y = (box_div.clientHeight / 2) | 0
                        // console.log(it)

                        it.name = '新线索'
                        // const obj = SubThreads.obj$.value
                        // obj.items.push(it)
                        // SubThreads.obj$.next(obj)
                        SubThreads.editing_item$.next(it)
                    }}
                >
                    新线索
                </DefaultButton>
                <DefaultButton
                    onClick={() => {
                        const obj = SubThreads.obj$.value
                        obj.canvas.width += 200
                        SubThreads.obj$.next(obj)
                    }}
                >
                    向右增加
                </DefaultButton>
            </div>
        )
    }
    // 编辑某个线索
    return (
        <div className={css(style.Ctrl)}>
            {/* 1 */}
            <div
                style={{
                    marginRight: 10,
                    width: 300,
                }}
            >
                <TextField
                    label="名称"
                    value={editing_item.name}
                    onChange={(_, ns) => {
                        ns = ns || ''
                        editing_item.name = ns
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></TextField>
                <TextField
                    label="描述"
                    multiline
                    autoAdjustHeight
                    value={editing_item.remark}
                    onChange={(_, ns) => {
                        ns = ns || ''
                        editing_item.remark = ns
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></TextField>
            </div>
            {/* 2 */}
            <div
                style={{
                    marginRight: 10,
                    width: 360,
                }}
            >
                <TextField
                    label="x"
                    value={editing_item.x + ''}
                    onChange={(_, ns) => {
                        const a = Number(ns || '') || 0
                        editing_item.x = a | 0
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></TextField>
                <Slider
                    min={0}
                    max={cns_w}
                    showValue={false}
                    value={editing_item.x}
                    onChange={(n) => {
                        editing_item.x = n
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></Slider>
                <TextField
                    label="y"
                    value={editing_item.y + ''}
                    onChange={(_, ns) => {
                        const a = Number(ns || '') || 0
                        editing_item.y = a | 0
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></TextField>
                <Slider
                    min={0}
                    max={cns_h}
                    showValue={false}
                    value={editing_item.y}
                    onChange={(n) => {
                        editing_item.y = n
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></Slider>
            </div>
            {/* 3 */}
            <div>
                <LabelHelp
                    label_prop={{
                        children: '后续线索',
                    }}
                    help_txt={['按住alt点击线索跳转到', '按住ctrl点击删除']}
                ></LabelHelp>
                {links.map((link) => (
                    <div
                        key={link.id}
                        className={css(style.ThreadsEditNextLinkItem)}
                        onClick={(e) => {
                            if (e.ctrlKey) {
                                editing_item.nexts = editing_item.nexts.filter((v) => v !== link.id)
                                SubThreads.editing_item$.next(editing_item)
                                return
                            }
                            if (e.altKey) {
                                const li = SubThreads.obj$.value.items
                                const f = li.find((v) => v.id === link.id)
                                if (f) {
                                    SubThreads.editing_item$.next(f)
                                }
                                e.preventDefault()
                                return
                            }
                        }}
                    >
                        {link.name}
                    </div>
                ))}
                <div className={css(StyleMake.wh(0, 10))}></div>
                <IconButton
                    iconProps={{
                        iconName: 'Add',
                    }}
                    onClick={() => {
                        DialogOneColLiGetter$.next(() => {
                            const obj = SubThreads.obj$
                            const li = obj.value.items
                            const edit = SubThreads.editing_item$.value
                            return li.filter((v) => v.id !== edit?.id)
                        })
                        DialogOneColConfirmHook$.next((id) => {
                            const edit = editing_item
                            if (!edit.nexts.includes(id)) {
                                edit.nexts.push(id)
                                SubThreads.editing_item$.next(edit)
                            }
                            console.log(id)
                        })
                        DialogOneColTitle$.next('选择线索(双击也可确认)')
                        DialogOneColShow$.next(true)
                    }}
                >
                    +
                </IconButton>
            </div>
            {/* 99 */}
            <div
                style={{
                    display: 'flex',
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                }}
            >
                <DefaultButton
                    onClick={() => {
                        SubThreads.editing_item$.next(null)
                    }}
                >
                    取消
                </DefaultButton>
                <div className={css(StyleMake.wh(10))}></div>
                <PrimaryButton
                    onClick={() => {
                        const obj = SubThreads.obj$.value
                        const li = obj.items
                        const fi = li.findIndex((v) => v.id === editing_item.id)
                        if (fi === -1) {
                            li.push(editing_item)
                        } else {
                            li[fi] = editing_item
                        }
                        SubThreads.editing_item$.next(null)
                        SubThreads.obj$.next(obj)
                    }}
                >
                    保存
                </PrimaryButton>
            </div>
        </div>
    )
}
