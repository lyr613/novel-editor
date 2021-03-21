import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Dialog, DialogFooter } from '@fluentui/react-internal'
import { DefaultButton, PrimaryButton } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { StyleMake } from 'style-/global'
import { BehaviorSubject } from 'rxjs'

/** 是否显示 */
export const DialogSelChapterShow$ = new BehaviorSubject(false)

/** 传入一个方法, 在确定时会先执行此方法 */
export const DialogSelChapterConfirmHook$ = new BehaviorSubject((vol: volume_vo | null, chap: chapter_vo | null) => {})

/**
 * 选择卷章
 * 保证活动实例是唯一的, 通过DialogSelChapterConfirmHook$传入确定时执行的方法
 */
export default function DialogSelChapter() {
    const show = useObservable(() => DialogSelChapterShow$, false)
    const volumes = useObservable(() => SubVolume.li$, [])
    const [vol_use, next_vol_use] = useState(null as null | volume_vo)
    const [chap_use, next_chap_use] = useState(null as null | chapter_vo)

    return (
        <Dialog
            dialogContentProps={{
                title: '选择卷章',
            }}
            hidden={!show}
            minWidth={600}
            maxWidth={1000}
        >
            <div className={css(style.Box)}>
                <div className={css(style.HalfBox, StyleMake.wh('50%', '100%'))}>
                    {volumes.map((vol) => (
                        <div
                            className={css(style.Item, vol.id === vol_use?.id ? style.ItemUse : null)}
                            key={vol.id}
                            onClick={() => {
                                next_vol_use(vol)
                                next_chap_use(null)
                            }}
                        >
                            {vol.name}
                        </div>
                    ))}
                </div>
                <div className={css(style.Hline)}></div>
                <div className={css(style.HalfBox, StyleMake.wh('50%', '100%'))}>
                    {(vol_use?.children ?? []).map((chap) => (
                        <div
                            className={css(style.Item, chap_use?.id === chap.id ? style.ItemUse : null)}
                            key={chap.id}
                            onClick={() => {
                                next_chap_use(chap)
                            }}
                        >
                            {chap.name}
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter>
                <DefaultButton
                    onClick={() => {
                        DialogSelChapterShow$.next(false)
                    }}
                >
                    取消
                </DefaultButton>
                <PrimaryButton
                    onClick={() => {
                        const func = DialogSelChapterConfirmHook$.value
                        func(vol_use, chap_use)
                        DialogSelChapterShow$.next(false)
                    }}
                >
                    好
                </PrimaryButton>
            </DialogFooter>
        </Dialog>
    )
}
