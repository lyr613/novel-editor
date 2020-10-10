// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { style as s } from './style'
import { Dropdown, Slider as SliderSlider, TextField } from 'office-ui-fabric-react'
import { next_router } from '@/router/router'
import { useObservable } from 'rxjs-hooks'
import { filter$ } from './filter'
import { shallowCopy } from '@/rx/shallow-copy'
import { npc_frequency_find$ } from './subj'
import { npc_use_id$, edit_npc_auto } from '@/source/npc'
import { chapter_li$ } from '@/source/chapter-node'
import { node_use$ } from '@/source/node/base'
import { push_node_edit_id_stack } from '@/source/node/stack'
import QvButton from '@/component/ui/button'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
/**
 * 控制栏
 */
export default function Bar() {
    return (
        <div className={css(s.bar)}>
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
        <div className={css(s.timeline, sc.bgclrl(6))} title="单击角色, 重要度高于100的将展示出现频率">
            <div className={css(sc.pos('relative'), sc.mar(10, 0), sc.wh('100%', 20), sc.bgclrl(5))}>
                {infor &&
                    infor.appear_infors.map((appear) => (
                        <div
                            key={appear.percentage}
                            className={css(s.hline, sc.pos('absolute', 0), sc.wh('1%', '100%'), sc.bgclrl(4))}
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
        <div className={css(gs.flhc, sc.wh('100%', 50), sc.padd(0, 10))}>
            <QvButton
                withTheme
                onClick={() => {
                    next_router('npc')
                }}
                style={{
                    margin: '0 10px 0 0',
                }}
            >
                角色概览
            </QvButton>
            <QvButton
                withTheme
                onClick={() => {
                    npc_use_id$.next('')
                    edit_npc_auto()
                    next_router('npc', 'edit')
                    console.log('开始创建角色')
                }}
                style={{
                    margin: '0 10px 0 0',
                }}
            >
                新角色
            </QvButton>
            <QvButton
                withTheme
                onClick={() => {
                    next_router('npc', 'link-graph')
                }}
                style={{
                    margin: '0 10px 0 0',
                }}
            >
                关系图
            </QvButton>
            <QvButton
                withTheme
                onClick={() => {
                    next_router('npc', 'link')
                }}
                style={{
                    margin: '0 10px 0 0',
                }}
            >
                关系设定
            </QvButton>
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
