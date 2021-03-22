import React, { useState, useEffect, useRef } from 'react'
import { style, style_item } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { debounceTime, map, switchMap } from 'rxjs/operators'
import { SubScreen } from 'subject-/screen'
import { Icon, PrimaryButton } from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { _npc } from '../../subj'
import { SubNpc } from 'subject-/npc'
import { ChapterSliderIndex$ } from 'component-/chapter-slider'
import { SubVolume } from 'subject-/volume'

/**
 */
export default function MainList() {
    const arr = useObservable(
        () =>
            SubNpc.li$.pipe(
                switchMap((npc_li) =>
                    SubScreen.sub$(300).pipe(
                        switchMap((screen) =>
                            ChapterSliderIndex$.pipe(
                                debounceTime(200),
                                map((chapter_index) => {
                                    const WW = screen.W
                                    const nw = SubScreen.auto_width(WW, 240, 20)
                                    const slice_remark_map = _get_npc_remark_sel_slice(chapter_index)
                                    return (
                                        npc_li
                                            .map((it) => {
                                                return {
                                                    npc: it,
                                                    w: nw.w,
                                                    slice_remark: slice_remark_map.get(it.id) || [],
                                                }
                                            })
                                            // 这里过滤, 如果没有取到备注, 就是不在任何片段内
                                            .filter((v) => v.slice_remark.length)
                                    )
                                }),
                            ),
                        ),
                    ),
                ),
            ),
        [],
    )
    return (
        <div className={css(style.MainList)}>
            {arr.map((it, i) => (
                <Item key={i} {...it} />
            ))}
        </div>
    )
}

interface p {
    w: number
    npc: npc_vo
    slice_remark: string[]
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
        const show_value = [p.npc.remark, ...p.slice_remark].join('\n----\n')
        editer.setValue(show_value)
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

function _get_npc_remark_sel_slice(chap_i: number) {
    // 整个章列表获取一个 id: index的map
    const chap_li = SubVolume.chaper_li
    const m_chap_i = new Map<string, number>()
    chap_li.forEach((chap, i) => {
        m_chap_i.set(chap.id, i)
    })
    const re_map = new Map<string, string[]>()
    const npc_li = SubNpc.li$.value
    // 过滤符合范围的片段, 取remark
    npc_li.forEach((npc) => {
        const txt2 = npc.slices
            .filter((sli) => {
                const sti = m_chap_i.get(sli.start_chapter) ?? Number.MAX_SAFE_INTEGER
                const edi = m_chap_i.get(sli.end_chapter) ?? -2
                // console.log(npc.name, sti, edi, sli.remark)

                return sti <= chap_i && chap_i <= edi
            })
            .map((v) => v.remark)
        re_map.set(npc.id, txt2)
    })
    return re_map
}
