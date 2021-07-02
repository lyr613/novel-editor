import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { DefaultButton, Icon, PrimaryButton } from '@fluentui/react'
import { BehaviorSubject, fromEvent, merge } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { concatMap, concatMapTo, map, switchMap, switchMapTo, takeUntil } from 'rxjs/operators'
import { StyleMake } from 'style-/global'
import { SubBookOption } from 'subject-/book-option'
import { SubBookEdit } from 'subject-/book-edit'

/**
 * 设置编辑窗口的尺寸
 */
export default function EditerSize() {
    const be = useObservable(() => SubBookEdit.entry_show$, '')
    return be === 'editer-size' ? <Setting /> : null
}

function Setting() {
    const [left, next_left] = useState(200)
    const [right, next_right] = useState(600)
    const [top, next_top] = useState(80)
    const [bottom, next_bottom] = useState(680)
    const refL = useRef(null as null | HTMLDivElement)
    const refR = useRef(null as null | HTMLDivElement)
    const refT = useRef(null as null | HTMLDivElement)
    const refB = useRef(null as null | HTMLDivElement)
    const refC = useRef(null as null | HTMLDivElement)

    const real_left = Math.min(left, right)
    const real_w = Math.max(left, right) - real_left
    const real_top = Math.min(top, bottom)
    const real_h = Math.max(top, bottom) - real_top
    // 加载编辑器设置
    useEffect(() => {
        const opt = SubBookOption.option$.value
        const o = opt.editer.size
        next_left(o.x)
        next_right(o.x + o.w)
        next_top(o.y)
        next_bottom(o.y + o.h)
    }, [])
    // 拖动边线时调整
    useEffect(() => {
        const doml = refL.current!
        const domr = refR.current!
        const domt = refT.current!
        const domb = refB.current!

        const ccat = () =>
            fromEvent<MouseEvent>(document, 'mousemove').pipe(
                takeUntil(
                    merge(fromEvent(document, 'leave'), fromEvent(document, 'mouseup'), fromEvent(document, 'keydown')),
                ),
            )

        const obl = fromEvent(doml, 'mousedown')
            .pipe(
                concatMap(ccat),
                map((e) => e.x),
            )
            .subscribe(next_left)
        const obr = fromEvent(domr, 'mousedown')
            .pipe(
                concatMap(ccat),
                map((e) => e.x),
            )
            .subscribe(next_right)
        const obt = fromEvent(domt, 'mousedown')
            .pipe(
                concatMap(ccat),
                map((e) => e.y),
            )
            .subscribe(next_top)
        const obb = fromEvent(domb, 'mousedown')
            .pipe(
                concatMap(ccat),
                map((e) => e.y),
            )
            .subscribe(next_bottom)
        return () => {
            obl.unsubscribe()
            obr.unsubscribe()
            obt.unsubscribe()
            obb.unsubscribe()
        }
    }, [])
    useEffect(() => {
        const dom = refC.current
        const doml = refL.current!
        const domr = refR.current!
        const domt = refT.current!
        const domb = refB.current!
        if (!dom) {
            return
        }
        const start$ = fromEvent<MouseEvent>(dom, 'mousedown').pipe(
            map((e) => ({
                x: e.screenX,
                y: e.screenY,
                l: parseInt(doml.style.left, 10),
                r: parseInt(domr.style.left, 10),
                t: parseInt(domt.style.top, 10),
                b: parseInt(domb.style.top, 10),
            })),
        )
        const move$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
            map((e) => ({
                x: e.screenX,
                y: e.screenY,
            })),
        )
        const stop$ = merge(
            fromEvent(document, 'leave'),
            fromEvent(document, 'mouseup'),
            fromEvent(document, 'keydown'),
        )
        const ob = start$
            .pipe(
                switchMap((xy0) =>
                    move$.pipe(
                        takeUntil(stop$),
                        map((xy1) => {
                            // console.log('333', xy0.l)

                            return {
                                l: xy0.l + (xy1.x - xy0.x),
                                r: xy0.r + (xy1.x - xy0.x),
                                t: xy0.t + (xy1.y - xy0.y),
                                b: xy0.b + (xy1.y - xy0.y),
                            }
                        }),
                    ),
                ),
            )
            .subscribe((o) => {
                next_left(o.l)
                next_right(o.r)
                next_top(o.t)
                next_bottom(o.b)
            })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={css(style.Setting)}>
            <div className={css(style.BtnBox)}>
                <DefaultButton
                    onClick={() => {
                        // const opt = SubBookOption.option$.value
                        // opt.editer.size.x = real_left
                        // opt.editer.size.w = real_w
                        // opt.editer.size.y = real_top
                        // opt.editer.size.h = real_h
                        // SubBookOption.save(opt)
                        // SubBookOption.load()
                        SubBookEdit.entry_show$.next('')
                    }}
                >
                    退出
                </DefaultButton>
                <DefaultButton
                    className={css(StyleMake.mar(0, 0, 0, 10))}
                    onClick={() => {
                        next_left(300)
                        next_right(700)
                        next_top(200)
                        next_bottom(700)
                    }}
                >
                    复位
                </DefaultButton>
                <PrimaryButton
                    className={css(StyleMake.mar(0, 0, 0, 10))}
                    onClick={() => {
                        const opt = SubBookOption.option$.value
                        opt.editer.size.x = real_left
                        opt.editer.size.w = real_w
                        opt.editer.size.y = real_top
                        opt.editer.size.h = real_h
                        SubBookOption.save(opt)
                        SubBookOption.load()
                        SubBookEdit.entry_show$.next('')
                    }}
                >
                    保存并退出
                </PrimaryButton>
            </div>

            {/* 中间调整位置 */}
            <div
                ref={refC}
                className={css(style.MoveCenter)}
                style={{
                    left: ((left + right) / 2) | 0,
                    top: ((top + bottom) / 2) | 0,
                }}
            ></div>
            <div
                className={css(style.Line, style.LineH, style.LineL)}
                ref={refL}
                style={{
                    left: left,
                }}
                draggable={false}
                onDragStart={(e) => {
                    e.preventDefault()
                }}
            >
                <p draggable={false} className={css(style.LineInH)}></p>
            </div>
            <div
                className={css(style.Line, style.LineH, style.LineR)}
                ref={refR}
                style={{
                    left: right,
                }}
                draggable={false}
                onDragStart={(e) => {
                    e.preventDefault()
                }}
            >
                <p className={css(style.LineInH)} draggable={false}></p>
            </div>
            <div
                className={css(style.Line, style.LineW, style.LineT)}
                ref={refT}
                style={{
                    top: top,
                }}
                draggable={false}
                onDragStart={(e) => {
                    e.preventDefault()
                }}
            >
                <p className={css(style.LineInW)} draggable={false}></p>
            </div>
            <div
                className={css(style.Line, style.LineW, style.LineB)}
                ref={refB}
                style={{
                    top: bottom,
                }}
                draggable={false}
                onDragStart={(e) => {
                    e.preventDefault()
                }}
            >
                <p className={css(style.LineInW)} draggable={false}></p>
            </div>
        </div>
    )
}
