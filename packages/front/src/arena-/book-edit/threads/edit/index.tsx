import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { SubThreads } from 'subject-/threads'
import { shallowCopy } from 'tool-/rx-shallow-copy'
import { DefaultButton, PrimaryButton, TextField } from '@fluentui/react'
import { map, switchMap } from 'rxjs/operators'
import { StyleTheme } from 'style-/theme'
import DialogOneCol, {
    DialogOneColConfirmHook$,
    DialogOneColLiGetter$,
    DialogOneColShow$,
    DialogOneColTitle$,
} from 'component-/dialog-one-col'
import { ToolTranData } from 'tool-/tran-data'

const ids = {
    box: 'threads-canvas-box',
    cns: 'threads-canvas',
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
                    id={ids.cns}
                    ref={ref_cns}
                    width={canvas_w}
                    height={canvas_h}
                    style={{
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
    if (editing_item === null) {
        return (
            <div className={css(style.Ctrl)}>
                <DefaultButton
                    onClick={() => {
                        const it = SubThreads.make_item()
                        const box_div = document.getElementById(ids.box)!
                        const cns_dom = document.getElementById(ids.cns)!
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
    return (
        <div className={css(style.Ctrl)}>
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
            <div
                style={{
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
                <TextField
                    label="y"
                    value={editing_item.y + ''}
                    onChange={(_, ns) => {
                        const a = Number(ns || '') || 0
                        editing_item.y = a | 0
                        SubThreads.editing_item$.next(editing_item)
                    }}
                ></TextField>
            </div>
            <div>
                <DefaultButton
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
                </DefaultButton>
            </div>
            <div
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                }}
            >
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
