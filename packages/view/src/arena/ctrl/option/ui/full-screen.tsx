// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeButton from '@/component/theme-button'
import { ipc, electron } from '@/const'
import { DefaultButton } from 'office-ui-fabric-react'

/** 窗口尺寸 */
export default function WindowSize() {
    const [be_full_screen, next_be_full_screen] = useState(false)
    useEffect(() => {
        function lin(_: any, b: boolean) {
            next_be_full_screen(b)
        }
        ipc().on('ui_window_full_status', lin)
        return () => {
            ipc().removeListener('ui_window_full_status', lin)
        }
    }, [])
    useEffect(() => {
        ipc().send('ui_window_full_status')
    }, [])
    return (
        <>
            <label className={s.Label}>窗口</label>
            {be_full_screen ? (
                <div className={s.FullScreen}>
                    <DefaultButton
                        className={s.btn}
                        onClick={() => {
                            ipc().send('ui_window_full_status', false)
                        }}
                    >
                        退出全屏
                    </DefaultButton>
                </div>
            ) : (
                <div className={s.FullScreen}>
                    <ThemeButton
                        add_class={[s.btn]}
                        onClick={() => {
                            ipc().send('ui_window_full_status', true)
                        }}
                    >
                        全屏
                    </ThemeButton>
                    <DefaultButton
                        className={s.btn}
                        onClick={() => {
                            ipc().send('ui_window_size', 1)
                        }}
                    >
                        最大化
                    </DefaultButton>
                    <DefaultButton
                        className={s.btn}
                        onClick={() => {
                            ipc().send('ui_window_size', 900, 600)
                        }}
                    >
                        900*600
                    </DefaultButton>
                </div>
            )}
        </>
    )
}
