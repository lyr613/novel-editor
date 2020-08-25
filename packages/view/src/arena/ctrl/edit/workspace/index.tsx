// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { key$ } from '@/subscribe'
import { editer_setting$ } from '@/subject'
import { zen$, etbottom$, ettop$, etnext$, etprev$, size$ } from './subj'
import { shallowCopy } from '@/rx/shallow-copy'
import CtrlBar from './ctrl-bar'
import HeadStack from './head-stack'
import { useEditor } from './hook-editor'

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
            <HeadStack />
            <div className={zencls}>
                <CtrlBar />
                <Write />
            </div>
        </div>
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

    useEditor(ref)
    // 给编辑器一个边框
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const ob = size$.subscribe((o) => {
            const layout = o.eset.editer.editer_layout
            const wh = {
                width: ((dom.clientWidth * layout.width) / 100) | 0,
                height: ((dom.clientHeight * layout.height) / 100) | 0,
            }
            set_w(wh.width)
            set_h(wh.height)
        })
        return () => {
            ob.unsubscribe()
        }
    }, [ref])

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
