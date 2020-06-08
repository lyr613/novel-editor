// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { fromEvent } from 'rxjs'
import { merge, concatMap, takeUntil } from 'rxjs/operators'
import {
    point_,
    one_draw_buffer$,
    pen_,
    of_pen,
    map_focu$,
    be_editing$,
    map_focu_id$,
    be_drawing$,
    map_txt_buffer$,
    map_foo_color$,
} from '../subj'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import DrawCellBox from './cell'

/** 主绘制显示区 */
export default function WorkSpace() {
    const be_editing = useObservable(() => be_editing$, false)
    const be_drawing = useObservable(() => be_drawing$, true)
    const foid = useObservable(() => map_focu_id$)

    return (
        <div className={s.WorkSpace}>
            <div className={s.square}>
                {be_editing && !!foid && be_drawing && <DrawBuffer />}
                {be_editing && !!foid && !be_drawing && <TextBuffer />}
                <DrawResult />
                <TextResult />
            </div>
            <DrawCellBox />
        </div>
    )
}

/** 绘制一条线的暂存 */
function DrawBuffer() {
    const draw_ref = useRef<null | HTMLDivElement>(null)
    const show_ref = useRef<null | HTMLCanvasElement>(null)
    // 控制
    useEffect(() => {
        const dom = draw_ref.current
        if (!dom) {
            return
        }
        const start$ = fromEvent(dom, 'mousedown')
        const move$ = fromEvent(dom, 'mousemove')
        const end$ = fromEvent(dom, 'mouseup').pipe(merge(fromEvent(dom, 'mouseleave')))
        const draw = start$
            .pipe(
                concatMap((st) => {
                    return move$.pipe(takeUntil(end$))
                }),
            )
            .subscribe((e) => {
                e.preventDefault()
                const pos = get_pos(e, dom)
                const narr = [...one_draw_buffer$.value, pos]
                one_draw_buffer$.next(narr)
            })
        const afterend = end$.subscribe(() => {
            if (one_draw_buffer$.value.length) {
                const nhis: pen_ = of_pen()
                nhis.points = one_draw_buffer$.value
                nhis.color = '#' + map_foo_color$.value
                const focu = map_focu$.value
                if (!focu) {
                    return
                }
                focu.pens = [...focu.pens, nhis]
                map_focu$.next(focu)
            }
            one_draw_buffer$.next([])
        })
        return () => {
            draw.unsubscribe()
            afterend.unsubscribe()
        }
    }, [])
    // 绘制
    useEffect(() => {
        const dom = show_ref.current
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!
        const ob = one_draw_buffer$.subscribe((arr) => {
            if (!arr.length) {
                cns.clearRect(0, 0, 1000, 1000)
                return
            }
            const l = new Path2D()

            l.moveTo(arr[0].x, arr[0].y)
            arr.forEach((pt) => {
                l.lineTo(pt.x, pt.y)
            })
            cns.stroke(l)
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <>
            <div ref={draw_ref} className={s.draw} draggable={false}></div>
            <canvas ref={show_ref} className={s.cns} width="1000" height="1000"></canvas>
        </>
    )
}

/** 线条绘制集合 */
function DrawResult() {
    const ref_cns = useRef<null | HTMLCanvasElement>(null)

    useEffect(() => {
        const dom = ref_cns.current
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!

        const ob = map_focu$.subscribe((focu) => {
            cns.clearRect(0, 0, 1000, 1000)
            const lines = focu?.pens
            if (!lines) {
                return
            }

            lines.forEach((line) => {
                cns.strokeStyle = line.color
                const pts = line.points
                const l = new Path2D()
                l.moveTo(pts[0].x, pts[0].y)
                pts.forEach((pt) => {
                    l.lineTo(pt.x, pt.y)
                })
                cns.stroke(l)
            })
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return <canvas className={s.DrawResult} ref={ref_cns} width="1000" height="1000"></canvas>
}

/**
 * 本次编辑的文字
 */
function TextBuffer() {
    const tbf = useObservable(() => map_txt_buffer$.pipe(shallowCopy()))
    const ref = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const ob = fromEvent(dom, 'mousedown').subscribe((e) => {
            e.preventDefault()
            const xy = get_pos(e, dom, 100)
            const bf = map_txt_buffer$.value
            bf.position = xy
            map_txt_buffer$.next(bf)
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])

    return (
        <div
            className={s.TextBuffer}
            ref={ref}
            onClick={() => {
                const m = map_txt_buffer$.value
            }}
        >
            {tbf && (
                <div
                    className={s.txt}
                    style={{
                        left: tbf.position.x + '%',
                        top: tbf.position.y + '%',
                        color: '#' + tbf.color,
                    }}
                >
                    {tbf.txt}
                </div>
            )}
        </div>
    )
}

/** 文字合集 */
function TextResult() {
    const fo = useObservable(() => map_focu$.pipe(shallowCopy()))
    const list = fo?.txts ?? []
    return (
        <div className={s.TextResult}>
            {list.map((v) => (
                <div
                    key={v.id}
                    className={[s.txt, v.linkid ? s.canclktxt : ''].join(' ')}
                    onClick={() => {
                        if (v.linkid) {
                            map_focu_id$.next(v.linkid)
                        }
                    }}
                    style={{
                        left: v.position.x + '%',
                        top: v.position.y + '%',
                        color: '#' + v.color,
                    }}
                >
                    {v.txt}
                </div>
            ))}
        </div>
    )
}

function get_pos(e: any, dom: HTMLDivElement, force = 1000) {
    const [W, H] = [dom.clientWidth, dom.clientHeight]
    return {
        x: ((e.layerX * force) / W) | 0,
        y: ((e.layerY * force) / H) | 0,
    }
}
