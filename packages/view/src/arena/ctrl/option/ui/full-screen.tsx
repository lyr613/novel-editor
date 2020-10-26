// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { ipc, system } from '@/const'
import QvButton from '@/component/ui/button'

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
                    <QvButton
                        onClick={() => {
                            ipc().send('ui_window_full_status', false)
                        }}
                        style={{
                            margin: '10px 0 10px 10px',
                        }}
                    >
                        退出全屏
                    </QvButton>
                </div>
            ) : (
                <div className={s.FullScreen}>
                    <QvButton
                        withTheme
                        onClick={() => {
                            ipc().send('ui_window_full_status', true)
                        }}
                        style={{
                            margin: '10px 0 10px 10px',
                        }}
                    >
                        全屏
                    </QvButton>
                    {system === 'win' && (
                        <>
                            <QvButton
                                style={{
                                    margin: '10px 0 10px 10px',
                                }}
                                onClick={() => {
                                    ipc().send('ui_window_size', 1)
                                }}
                            >
                                最大化
                            </QvButton>
                            <QvButton
                                style={{
                                    margin: '10px 0 10px 10px',
                                }}
                                onClick={() => {
                                    ipc().send('ui_window_size', 900, 600)
                                }}
                            >
                                900*600
                            </QvButton>
                        </>
                    )}
                    <QvButton
                        style={{
                            margin: '10px 0 10px 40px',
                        }}
                        onDoubleClick={() => {
                            ipc().send('ui_esc')
                        }}
                    >
                        双击退出
                    </QvButton>
                </div>
            )}
        </>
    )
}
