import React, { useState, useEffect, useRef } from 'react'
import { style, style_item } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { map, switchMap } from 'rxjs/operators'
import { SubScreen } from 'subject-/screen'
import { Icon, PrimaryButton } from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { _npc } from '../../subj'
import { SubNpc } from 'subject-/npc'

/**
 */
export default function MainList() {
    const arr = useObservable(
        () =>
            SubNpc.li$.pipe(
                switchMap((li) =>
                    SubScreen.sub$(300).pipe(
                        map((screen) => {
                            const WW = screen.W
                            const w = SubScreen.auto_width(WW, 240, 20)
                            return li.map((it) => ({
                                npc: it,
                                w: w.w,
                            }))
                        }),
                    ),
                ),
            ),
        [],
    )
    return (
        <div className={css(style.MainList)}>
            {arr.map((it, i) => (
                <Item key={i} w={it.w} npc={it.npc} />
            ))}
        </div>
    )
}

interface p {
    w: number
    npc: npc_vo
}
function Item(p: p) {
    const ref_editer = useRef(null as null | HTMLDivElement)
    useEffect(() => {
        const dom = ref_editer.current
        if (!dom) {
            return
        }
        const opt = SubMonaco.default_option
        opt.readOnly = true
        opt.contextmenu = false
        opt.scrollBeyondLastLine = false
        const editer = monaco.editor.create(dom, opt)
        editer.setValue(p.npc.remark)
        return () => {
            editer.dispose()
        }
    }, [p])
    return (
        <div
            className={css(style.Item)}
            style={{
                width: p.w + 'px',
            }}
        >
            <div className={css(style_item.Container)}>
                <div className={css(style_item.TopLine)}>
                    <span className={css(style_item.TopLineName)}>{p.npc.name_show}</span>
                    {/* 编辑按钮 */}
                    <div
                        className={css(style_item.TopLineIcon)}
                        onClick={() => {
                            SubNpc.edit$.next(p.npc)
                            _npc.show_type$.next('edit')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                    <div className={css(style_item.TopLineIcon)}>
                        <Icon iconName="Relationship" />
                    </div>
                </div>
                <div ref={ref_editer} className={css(style_item.Editer)}></div>
            </div>
        </div>
    )
}
