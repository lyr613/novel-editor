// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { PrimaryButton, Dropdown, Slider as SliderSlider, TextField } from 'office-ui-fabric-react'
import { next_router } from '@/router/router'
import { useObservable } from 'rxjs-hooks'
import { filter$ } from '../subj'
import ThemeButton from '@/component/theme-button'
import { shallowCopy } from '@/rx/shallow-copy'
import { npc_frequency_find$ } from './subj'
import { npc_use_id$, edit_npc_auto } from '@/source/npc'
import { chapter_li$ } from '@/source/chapter-node'
import { node_use$ } from '@/source/node/base'
import { push_node_edit_id_stack } from '@/source/node/stack'

/**
 * 控制栏
 */
export default function Bar() {
    return (
        <div className={s.Bar}>
            <TimeLine />
            <Action />
        </div>
    )
}

/** 顶部时间轴 */
function TimeLine() {
    const fres = useObservable(() => npc_frequency_find$, [])
    const npc_use_id = useObservable(() => npc_use_id$)
    const infor = fres.filter((v) => v.id === npc_use_id)[0]

    return (
        <div className={s.TimeLine} title="单击角色, 重要度高于100的将展示出现频率">
            <div className={s.line}>
                {infor &&
                    infor.appear_infors.map((appear) => (
                        <div
                            key={appear.percentage}
                            className={s.hline}
                            onClick={() => {
                                const cps = chapter_li$.value
                                for (const cp of cps) {
                                    for (const node of cp.children) {
                                        // 如果查到章节, 跳到编辑页
                                        if (node.id === appear.node_id) {
                                            node_use$.next(node)
                                            push_node_edit_id_stack([node.id])
                                            next_router('edit')
                                            break
                                        }
                                    }
                                }
                            }}
                            style={{
                                left: appear.percentage + '%',
                            }}
                        ></div>
                    ))}
            </div>
        </div>
    )
}

function Action() {
    const fil = useObservable(() => filter$.pipe(shallowCopy()))
    if (!fil) {
        return null
    }
    return (
        <div className={s.Action}>
            <ThemeButton
                onClick={() => {
                    npc_use_id$.next('')
                    edit_npc_auto()
                    next_router('npc', 'edit')
                }}
            >
                新角色
            </ThemeButton>
            <ThemeButton
                onClick={() => {
                    next_router('npc', 'link-graph')
                }}
                add_class={[s.btn]}
            >
                关系图
            </ThemeButton>
            <TextField
                placeholder="搜索"
                value={fil.name}
                onChange={(_, str) => {
                    fil.name = str || ''
                    filter$.next(fil)
                }}
                onFocus={() => {
                    fil.name = ''
                    filter$.next(fil)
                }}
            ></TextField>
        </div>
    )
}
