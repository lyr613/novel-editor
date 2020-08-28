// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { ipc } from '@/const'
import QvButton from '@/component/ui/button'

/** 更新app弹窗 */
export default function UpdateApp() {
    const [html, next_html] = useState(``)
    useEffect(() => {
        function tar(_: any, msg: string) {
            next_html(msg)
        }
        ipc().on('update-app', tar)
        return () => {
            ipc().removeListener('update-app', tar)
        }
    }, [])
    if (!html) {
        return null
    }
    return (
        <div className={s.UpdateApp}>
            <div className={s.border}>
                <div className={s.title}>版本更新</div>
                <div
                    className={s.txt}
                    dangerouslySetInnerHTML={{
                        __html: html,
                    }}
                ></div>
                <div className={s.foo}>
                    <QvButton
                        withTheme
                        onClick={() => {
                            ipc().send('update-app')
                        }}
                        style={{
                            marginRight: '20px',
                        }}
                    >
                        在浏览器查看
                    </QvButton>
                    <QvButton
                        onClick={() => {
                            next_html('')
                        }}
                    >
                        忽略
                    </QvButton>
                </div>
            </div>
        </div>
    )
}
