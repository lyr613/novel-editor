import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Dialog, DialogFooter } from '@fluentui/react'
import { DefaultButton, PrimaryButton } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { StyleMake } from 'style-/global'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

/** 是否显示 */
export const DialogOneColShow$ = new BehaviorSubject(false)

interface T extends with_id {
    name: string
}
/** 获取列表的方法 */
export const DialogOneColLiGetter$ = new BehaviorSubject(() => [] as T[])

export const DialogOneColTitle$ = new BehaviorSubject('')

/** 传入一个方法, 在确定时会先执行此方法 */
export const DialogOneColConfirmHook$ = new BehaviorSubject((use_id: string) => {})

/**
 * 选择卷章
 * 保证活动实例是唯一的, 通过DialogSelChapterConfirmHook$传入确定时执行的方法
 */
export default function DialogOneCol() {
    const show = useObservable(() => DialogOneColShow$, false)
    const rows = useObservable(() => DialogOneColLiGetter$.pipe(map((fun) => fun())), [])
    const title = useObservable(() => DialogOneColTitle$, '')
    const [use_id, next_use_id] = useState('')
    function clear() {
        DialogOneColConfirmHook$.next((use_id: string) => {})
        next_use_id('')
    }

    function confirm() {
        const func = DialogOneColConfirmHook$.value
        func(use_id)
        DialogOneColShow$.next(false)
        clear()
    }

    return (
        <Dialog
            dialogContentProps={{
                title,
            }}
            hidden={!show}
            minWidth={600}
            maxWidth={1000}
        >
            <div className={css(style.Box)}>
                <div className={css(style.HalfBox, StyleMake.wh('100%', '100%'))}>
                    {rows.map((row) => (
                        <div
                            className={css(style.Item, row.id === use_id ? style.ItemUse : null)}
                            key={row.id}
                            onClick={() => {
                                next_use_id(row.id)
                            }}
                            onDoubleClick={confirm}
                        >
                            {row.name}
                        </div>
                    ))}
                </div>
            </div>
            <DialogFooter>
                <DefaultButton
                    onClick={() => {
                        DialogOneColShow$.next(false)
                    }}
                >
                    取消
                </DefaultButton>
                <PrimaryButton onClick={confirm}>好</PrimaryButton>
            </DialogFooter>
        </Dialog>
    )
}
