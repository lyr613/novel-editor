import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from '@fluentui/react'
import { StyleMake } from 'style-/global'
import { SubCube } from 'subject-/cube'

/** 是否显示 */
export const DialogSelCubeShow$ = new BehaviorSubject(false)

/** 传入一个方法, 在确定时会先执行此方法 */
export const DialogSelCubeConfirmHook$ = new BehaviorSubject((groups: cube_group_vo[]) => {})

/**
 */
export default function DialogSelCube() {
    const show = useObservable(() => DialogSelCubeShow$, false)
    const l1s = useObservable(() => SubCube.li$, [])
    const [l1_map, next_l1_map] = useState(new Map<string, boolean>())
    const [l2_map, next_l2_map] = useState(new Map<string, boolean>())
    const l1_seled_li = get_seled_li(l1_map, l1s)
    const l2_can_sel_li = l1_seled_li.map((v) => v.children).flat()
    return (
        <Dialog
            dialogContentProps={{
                title: '选择词条(按住ctrl多选)',
            }}
            hidden={!show}
            minWidth={600}
            maxWidth={1000}
        >
            <div className={css(style.Box)}>
                <div className={css(style.HalfBox, StyleMake.wh('50%', '100%'))}>
                    {l1s.map((l1) => (
                        <div
                            className={css(style.Item, l1_map.get(l1.id) ? style.ItemUse : null)}
                            key={l1.id}
                            onClick={(e) => {
                                next_l2_map(new Map())

                                if (e.ctrlKey) {
                                    const b = l1_map.get(l1.id)
                                    l1_map.set(l1.id, !b)
                                    const nm = new Map(l1_map)
                                    next_l1_map(nm)
                                    return
                                }
                                const m = new Map([[l1.id, true]])
                                next_l1_map(m)
                            }}
                        >
                            {l1.name}
                        </div>
                    ))}
                </div>
                <div className={css(style.Hline)}></div>
                <div className={css(style.HalfBox, StyleMake.wh('50%', '100%'))}>
                    {l2_can_sel_li.map((l2) => (
                        <div
                            className={css(style.Item, l2_map.get(l2.id) ? style.ItemUse : null)}
                            key={l2.id}
                            onClick={(e) => {
                                if (e.ctrlKey) {
                                    const b = l2_map.get(l2.id)
                                    l2_map.set(l2.id, !b)
                                    const nm = new Map(l2_map)
                                    next_l2_map(nm)
                                    return
                                }
                                const m = new Map([[l2.id, true]])
                                next_l2_map(m)
                            }}
                        >
                            {l2.name}
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter>
                <DefaultButton
                    onClick={() => {
                        DialogSelCubeShow$.next(false)
                    }}
                >
                    取消
                </DefaultButton>
                <PrimaryButton
                    onClick={() => {
                        const seled = l1_seled_li.map((l1) => {
                            const l11 = { ...l1 }
                            l11.children = l11.children.filter((v) => l2_map.get(v.id))
                            return l11
                        })
                        const func = DialogSelCubeConfirmHook$.value
                        func(seled)
                        DialogSelCubeShow$.next(false)
                    }}
                >
                    好
                </PrimaryButton>
            </DialogFooter>
        </Dialog>
    )
}

function get_seled_li<T>(map: Map<string, boolean>, li: T[]): T[] {
    return li.filter((it) => map.get((it as any).id))
}
