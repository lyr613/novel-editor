import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { DefaultButton, Dialog, DialogFooter, PrimaryButton, TextField } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'

/** 是否显示 */
export const DialogSimpleValueShow$ = new BehaviorSubject(false)

/** 传入一个方法, 在确定时会先执行此方法 */
export const DialogSimpleValueConfirmHook$ = new BehaviorSubject((value: string) => {})

/**
 * 简单值
 */
export default function DialogSimpleValue() {
    const show = useObservable(() => DialogSimpleValueShow$, false)
    const [value, next_value] = useState('')
    return (
        <Dialog
            dialogContentProps={{
                title: '设置值',
            }}
            hidden={!show}
            minWidth={400}
            maxWidth={1000}
        >
            <div className={css(style.Box)}>
                <TextField
                    value={value}
                    onChange={(_, ns) => {
                        next_value(ns || '')
                    }}
                ></TextField>
            </div>
            <DialogFooter>
                <DefaultButton
                    onClick={() => {
                        DialogSimpleValueShow$.next(false)
                    }}
                >
                    取消
                </DefaultButton>
                <PrimaryButton
                    onClick={() => {
                        const func = DialogSimpleValueConfirmHook$.value
                        func(value)
                        DialogSimpleValueShow$.next(false)
                        next_value('')
                    }}
                >
                    好
                </PrimaryButton>
            </DialogFooter>
        </Dialog>
    )
}
