import React, { useState, useEffect, useRef } from 'react'
import { style, style_item } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject, from } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { debounceTime, map, switchMap } from 'rxjs/operators'
import { SubScreen } from 'subject-/screen'
import { Icon, PrimaryButton } from '@fluentui/react'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { SubNpc } from 'subject-/npc'
import { ChapterSliderIndex$ } from 'component-/chapter-slider'
import { SubVolume } from 'subject-/volume'
import { _filter$ } from '../subj'
import { StyleMake } from 'style-/global'
import { ToolTranData } from 'tool-/tran-data'
import { SubBookEdit } from 'subject-/book-edit'

// 逐步收集角色列表, 屏幕信息, 过滤
const l1$ = SubNpc.li$.pipe(switchMap((npc_li) => SubScreen.sub$(300).pipe(map((screen) => ({ screen, npc_li })))))

const l2$ = l1$.pipe(switchMap((obj) => _filter$.pipe(map((fil) => ({ ...obj, fil })))))

const l3$ = l2$.pipe(
    switchMap((obj) =>
        (obj.fil.chapter ? ChapterSliderIndex$ : from([0])).pipe(map((chapter_index) => ({ ...obj, chapter_index }))),
    ),
)

const l4$ = l3$.pipe(
    map((obj) => {
        const { npc_li, screen, fil, chapter_index } = obj
        const WW = screen.W
        const nw = SubScreen.auto_width(WW, 300, 20)
        const slice_remark_map = _get_npc_remark_sel_slice(chapter_index)
        const show_li = npc_li.filter((npc) => {
            if (fil.all) {
                return true
            }
            if (!npc.name_show.includes(fil.name)) {
                return false
            }
            if (fil.chapter) {
                const arr = slice_remark_map.get(npc.id) ?? []
                if (!arr.length) {
                    return false
                }
            }
            return true
        })
        return show_li.map((it) => {
            const o = {
                npc: it,
                w: nw.w,
                slice_remark: slice_remark_map.get(it.id) || [],
                show_txt: '',
            }
            o.show_txt = ToolTranData.format_txt(
                [o.npc.remark, ...o.slice_remark].filter((v) => !!v).join('\n=-=-=-=\n'),
                '　　',
                1,
            )
            return o
        })
    }),
)

/**
 */
export default function MainList() {
    const arr = useObservable(() => l4$, [])
    return (
        <div className={css(style.MainList)}>
            {arr.map((it, i) => (
                <Item key={it.npc.id} {...it} index={i} />
            ))}
        </div>
    )
}

interface p {
    w: number
    npc: npc_vo
    /** 没用了现在 */
    slice_remark: string[]
    index: number
    show_txt: string
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
        const show_value = p.show_txt
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
                            SubBookEdit.entry_show$.next('npc-set')
                        }}
                    >
                        <Icon iconName="Settings" />
                    </div>
                    {/* 关系按钮 */}
                    <div className={css(style_item.TopLineIcon)}>
                        <Icon
                            iconName="Relationship"
                            onClick={() => {
                                SubNpc.edit$.next(p.npc)
                                SubBookEdit.entry_show$.next('npc-link')
                            }}
                        />
                    </div>
                </div>
                {/* 前4个用monaco, 之后为了性能, 用普通div */}
                {p.index < 4 ? (
                    <div ref={ref_editer} className={css(style_item.Editer)}></div>
                ) : (
                    <div className={css(style_item.Editer, style_item.EditerCommon)}>{p.show_txt}</div>
                )}
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
        if (!npc.slices.length) {
            return
        }
        if (npc.slices.length === 1) {
            // 这里补充, 单片段的无设置直接塞进去备注
            const sli = npc.slices[0]
            if (!sli.start_chapter && !sli.end_chapter) {
                const txt2 = [sli.remark]
                re_map.set(npc.id, txt2)
                return
            }
        }
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
