// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeButton from '@/component/theme-button'
import { ipc } from '@/const'
import { DefaultButton } from 'office-ui-fabric-react'

/** 全屏 */
export default function FullScreen() {
    return (
        <>
            <label className={s.Label}>全屏</label>
            <div className={s.FullScreen}>
                <ThemeButton
                    add_class={[s.btn]}
                    onClick={() => {
                        ipc().send('key-full-screen', true)
                    }}
                >
                    全屏
                </ThemeButton>
                <DefaultButton
                    className={s.btn}
                    onClick={() => {
                        ipc().send('key-full-screen', false)
                    }}
                >
                    退出全屏
                </DefaultButton>
            </div>
        </>
    )
}
