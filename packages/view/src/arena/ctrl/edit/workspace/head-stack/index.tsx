import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { node_use_buffer$, node_use$ } from '@/source/node'
import { Icon } from 'office-ui-fabric-react'

/** HeadStack */
export default function HeadStack() {
    const li = useObservable(() => node_use_buffer$, [])
    const use = useObservable(() => node_use$)

    return (
        <ul className={css(s.box, gs.flex, sc.wh('100%', 30))}>
            {li.map((one) => (
                <li
                    className={css(
                        s.one,
                        gs.flhc,
                        sc.wh(undefined, 30),
                        sc.padd(0, 10),
                        sc.bgclrl(use?.id === one.id ? 5 : 6),
                        sc.fts(0),
                        gs.pointer,
                    )}
                    key={one.id}
                    onClick={() => {
                        node_use$.next(one)
                    }}
                >
                    <span className={css(sc.fts(12))}>{one.name}</span>
                    <Icon
                        className={css(sc.wh(18), sc.padd(0, 0, 0, 5), sc.fts(use?.id === one.id ? 12 : 'inherit'))}
                        iconName="Cancel"
                        onDoubleClick={(e) => {
                            e.stopPropagation()
                            const i = node_use_buffer$.value.findIndex((v) => v.id === one.id)
                            const arr = node_use_buffer$.value.filter((v) => v.id !== one.id)
                            node_use_buffer$.next(arr)
                            if (one.id === use?.id) {
                                const ni = Math.max(0, i - 1)
                                node_use$.next(arr[ni] || null)
                            }
                        }}
                    ></Icon>
                </li>
            ))}
        </ul>
    )
}
