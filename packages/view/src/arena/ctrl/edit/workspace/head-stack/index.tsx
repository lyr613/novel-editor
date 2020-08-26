import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { node_use$ } from '@/source/node/base'
import { Icon } from 'office-ui-fabric-react'
import {
    node_edit_stack$,
    node_edit_id_stack$,
    remove_node_edit_id_stack,
    get_cur_node_stack,
} from '@/source/node/stack'

/** HeadStack */
export default function HeadStack() {
    const li = useObservable(() => node_edit_stack$, [])
    const use = useObservable(() => node_use$)

    return (
        <ul className={css(s.box, gs.flex, sc.wh('100%', 30), sc.bgclrl(6))}>
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
                        onClick={(e) => {
                            e.stopPropagation()
                            const it_id = one.id
                            const i = node_edit_id_stack$.value.findIndex((v) => v === it_id)
                            remove_node_edit_id_stack([it_id])
                            if (it_id === use?.id) {
                                const arr = get_cur_node_stack()
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
