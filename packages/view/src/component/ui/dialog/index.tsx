import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

interface p {
    hidden: boolean
    children?: React.ReactNode
}

/** Dialog */
export default function QvDialog(p: p) {
    if (p.hidden) {
        return null
    }
    return (
        <div
            className={css(s.root, gs.flhc, gs.flwc, sc.pos('fixed', 0, 0, 0, 0, 999999), sc.wh('100vw', '100vh'))}
            onClick={() => {}}
        >
            <div className={css(s.container)}>
                <div className={css(s.head, gs.flsb)}>
                    <div className={css(s.title, sc.fts(24))}>标题</div>
                    <div className={css(s.close, sc.fts(16))}>X</div>
                </div>
                {p.children}
            </div>
        </div>
    )
}
