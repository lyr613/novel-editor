import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { DefaultButton, Icon } from '@fluentui/react'
import { BehaviorSubject, fromEvent, merge } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { concatMap, concatMapTo, map, switchMap, switchMapTo, takeUntil } from 'rxjs/operators'
import { StyleMake } from 'style-/global'
import { SubBookOption } from 'subject-/book-option'

const icon_type$ = new BehaviorSubject(true)

/**
 * 设置编辑窗口的尺寸
 */
export default function EditerSize() {
    const iconing = useObservable(() => icon_type$, true)
    return iconing ? <IconType /> : <Setting />
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(6)}
            title="调整编辑框尺寸"
            onClick={() => {
                icon_type$.next(false)
            }}
        >
            <Icon iconName="Move" />
        </div>
    )
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

    const real_left = Math.min(left, right)
    const real_w = Math.max(left, right) - real_left
    const real_top = Math.min(top, bottom)
    const real_h = Math.max(top, bottom) - real_top
    useEffect(() => {
        const opt = SubBookOption.option$.value
        const o = opt.editer.size
        next_left(o.x)
        next_right(o.x + o.w)
        next_top(o.y)
        next_bottom(o.y + o.h)
    }, [])
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
    return (
        <div className={css(style.Setting)}>
            <div className={css(style.BtnBox)}>
                <DefaultButton
                    onClick={() => {
                        const opt = SubBookOption.option$.value
                        opt.editer.size.x = real_left
                        opt.editer.size.w = real_w
                        opt.editer.size.y = real_top
                        opt.editer.size.h = real_h
                        SubBookOption.save(opt)
                        SubBookOption.load()
                        icon_type$.next(true)
                    }}
                >
                    返回
                </DefaultButton>
                <DefaultButton
                    className={css(StyleMake.mar(0, 0, 0, 10))}
                    onClick={() => {
                        next_left(300)
                        next_right(700)
                        next_top(100)
                        next_bottom(700)
                    }}
                >
                    复位
                </DefaultButton>
            </div>
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
