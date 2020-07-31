// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { chapter_li$ } from '@/source/chapter-node'
import { Checkbox } from 'office-ui-fabric-react'
import { sel_node2$, sel_node1$, sel_id_map$ } from './subj'

export default function Left() {
    const cli = useObservable(() => chapter_li$, [])
    const sel_id_map = useObservable(() => sel_id_map$)

    return (
        <div className={s.Left}>
            <div className={s.help}>按住shift可以连续选择</div>
            {cli.map((cp, y) => (
                <div className={s.Chapter} key={cp.id}>
                    <div className={s.cpname}>{cp.name}</div>
                    {cp.children.map((nd, x) => (
                        <div
                            className={s.node}
                            key={nd.id}
                            onClick={(e) => {
                                if (e.shiftKey) {
                                    sel_node2$.next([y, x])
                                } else {
                                    sel_node1$.next([y, x])
                                    sel_node2$.next([y, x])
                                }
                            }}
                        >
                            <Checkbox checked={sel_id_map?.get(nd.id) === true} />
                            {nd.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
