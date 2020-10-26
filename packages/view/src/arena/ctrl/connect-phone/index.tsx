import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import QvLabel from '@/component/ui/label'
import { ipc } from '@/const'

/** 连接手机 */
export default function ConnectPhone() {
    const [socket_src, next_socket_src] = useState('')
    useEffect(() => {
        setTimeout(() => {
            const src = ipc().sendSync('phone_socket_src')
            console.log('src', src)
        }, 50)
    }, [])
    return (
        <div className={css(s.root)}>
            <div className={css(s.toptitle, gs.flhc, sc.wh('100%', 40), sc.bgclrl(7))}>
                <QvLabel>连接手机</QvLabel>
            </div>
            <div className={css(s.help)}>通过app扫码连接电脑和手机后, 可以双向同步数据,</div>
        </div>
    )
}

/** 二维码 */
function QR() {
    useEffect(() => {
        const src = ipc().sendSync('phone_socket_src')
    }, [])
    return <div className={css()}></div>
}
