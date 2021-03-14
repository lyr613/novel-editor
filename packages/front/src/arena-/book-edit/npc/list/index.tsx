import React, { useState, useEffect, useRef } from 'react'
import { style, style_item } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { map, switchMap } from 'rxjs/operators'
import { SubScreen } from 'subject-/screen'
import { Icon } from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { Rt } from 'router-'
import { _npc } from '../subj'
const arr = Array.from({ length: 22 }, (_, i) => i)
const arr$ = new BehaviorSubject(arr)

/**
 */
export default function List() {
    const arr = useObservable(
        () =>
            arr$.pipe(
                switchMap((li) =>
                    SubScreen.sub$(300).pipe(
                        map((screen) => {
                            const WW = screen.W
                            const w = SubScreen.auto_width(WW, 240, 20)
                            return li.map((it) => ({
                                item: it,
                                w: w,
                            }))
                        }),
                    ),
                ),
            ),
        [],
    )
    return (
        <div className={css(style.root)}>
            {arr.map((it, i) => (
                <Item key={i} w={it.w} />
            ))}
        </div>
    )
}

function Item(p: any) {
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
        editer.setValue('测试一下\nsdflll')
        return () => {
            editer.dispose()
        }
    }, [])
    return (
        <div
            className={css(style.Item)}
            style={{
                width: p.w.w + 'px',
            }}
        >
            <div className={css(style_item.Container)}>
                <div className={css(style_item.TopLine)}>
                    <span className={css(style_item.TopLineName)}>名字(昵称)</span>
                    <div
                        className={css(style_item.TopLineIcon)}
                        onClick={() => {
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
