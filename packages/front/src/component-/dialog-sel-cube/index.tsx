import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { DefaultButton, Dialog, DialogFooter, PrimaryButton } from '@fluentui/react'
import { StyleMake } from 'style-/global'
import { SubCube } from 'subject-/cube'
import { SourceLevel2Select } from 'subject-/source-dialog-sel'

/** 是否显示 */
export const DialogSelCubeShow$ = new BehaviorSubject(false)

/** 传入一个方法, 在确定时会先执行此方法 */
export const DialogSelCubeConfirmHook$ = new BehaviorSubject((groups: cube_group_vo[]) => {})

const subj = new SourceLevel2Select<cube_group_vo, cube_item_vo>(SubCube.li$)

/**
 */
export default function DialogSelCube() {
    const show = useObservable(() => DialogSelCubeShow$, false)
    const l1s = useObservable(() => SubCube.li$, [])
    const l1_map = useObservable(() => subj.seled_l1_map$, new Map())
    const l2_map = useObservable(() => subj.seled_l2_map$, new Map())

    const l2_can_sel_li = useObservable(() => subj.l2_can_show_li$, [])

    return (
        <Dialog
            dialogContentProps={{
                title: '选择词条(按住ctrl或shift多选)',
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
                                subj.click_l1(e, l1.id)
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
                                subj.click_l2(e, l2.id)
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
                        subj.clear()
                    }}
                >
                    取消
                </DefaultButton>
                <PrimaryButton
                    onClick={() => {
                        const seled = subj.seled_l1_li.map((l1) => {
                            const l11 = { ...l1 }
                            l11.children = l11.children.filter((v) => l2_map.get(v.id))
                            return l11
                        })
                        const func = DialogSelCubeConfirmHook$.value
                        func(seled)
                        DialogSelCubeShow$.next(false)
                        subj.clear()
                    }}
                >
                    好
                </PrimaryButton>
            </DialogFooter>
        </Dialog>
    )
}
