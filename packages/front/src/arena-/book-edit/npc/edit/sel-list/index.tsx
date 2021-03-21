import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { SubNpc } from 'subject-/npc'
import { StyleComp } from 'style-/comp'

/**
 */
export default function SelList() {
    const npcs = useObservable(() => SubNpc.li$, [])
    const editing = useObservable(() => SubNpc.edit$, null)

    return (
        <div className={css(style.SelList)}>
            {npcs.map((npc) => (
                <div
                    key={npc.id}
                    className={css(
                        style.Item,
                        StyleComp.select_item.item,
                        editing?.id === npc.id ? StyleComp.select_item.high : null,
                    )}
                    onClick={() => {
                        SubNpc.edit$.next(npc)
                    }}
                >
                    {npc.name}
                </div>
            ))}
        </div>
    )
}

interface p {
    npc: npc_vo
}

function Item(p: p) {
    return <div className={css(style.Item, StyleComp.select_item.item)}>{p.npc.name_show}</div>
}
