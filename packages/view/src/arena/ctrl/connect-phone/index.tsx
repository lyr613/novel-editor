import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import QvLabel from '@/component/ui/label'
import { ipc } from '@/const'
import Qrcode from 'qrcode'
import QvButton from '@/component/ui/button'

/** 连接手机 */
export default function ConnectPhone() {
    const [haserr, next_haserr] = useState(false)
    const [socket_src, next_socket_src] = useState('')
    useEffect(() => {
        const src = ipc().sendSync('phone_socket_src')
        if (src) {
            Qrcode.toDataURL(
                src,
                {
                    errorCorrectionLevel: 'H',
                    rendererOpts: {
                        quality: 1,
                    },
                    width: 300,
                    color: {
                        light: `#ffffffee`,
                    },
                },
                (err, url) => {
                    next_socket_src(url)
                },
            )
        } else {
            next_haserr(true)
        }
        console.log('src', src)
    }, [])
    return (
        <div className={css(s.root)}>
            <div className={css(s.toptitle, gs.flhc, sc.wh('100%', 40), sc.bgclrl(7))}>
                <QvLabel>连接手机</QvLabel>
            </div>
            <div className={css(s.help)}>通过app扫码连接电脑和手机后, 可以双向同步数据,</div>
            {socket_src && (
                <>
                    <img className={css(sc.mar(0, 20, 20), sc.wh(300, 300))} src={socket_src} alt="" />
                    <Action />
                </>
            )}
            {haserr && <div>服务生成失败, 可能检查不到wlan网络</div>}
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

function Action() {
    return (
        <div className={css(sc.mar(0, 20))}>
            <div>
                <QvLabel>选择需要同步的书</QvLabel>
            </div>
            <div className={css(sc.mar(0, 0, 10))}>
                <QvButton withTheme>{'手机 -> PC'}</QvButton>
            </div>
            <div className={css(sc.mar(0, 0))}>
                <QvButton withTheme>{'PC -> 手机'}</QvButton>
            </div>
        </div>
    )
}
