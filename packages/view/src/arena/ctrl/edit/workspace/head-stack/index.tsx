import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { node_use_buffer$, node_use$ } from '@/source/node'

/** HeadStack */
export default function HeadStack() {
    const li = useObservable(() => node_use_buffer$, [])
    const use = useObservable(() => node_use$)

    return (
        <ul className={css(s.root, gs.flex, sc.wh('100%', 30))}>
            {li.map((one) => (
                <li className={css(sc.wh(undefined, '100%'), sc.bgclrl(use?.id === one.id ? 6 : 7))} key={one.id}></li>
            ))}
        </ul>
    )
}
