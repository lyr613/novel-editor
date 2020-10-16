import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import QvButton from '@/component/ui/button'
import { npc_did_filter_li$ } from './npc-li'
import { useObservable } from 'rxjs-hooks'
import { TextField } from 'office-ui-fabric-react'
import { StyleSheet, CSSProperties } from 'aphrodite'

/** Edit */
export default function Edit() {
    const li = useObservable(() => npc_did_filter_li$, [])
    return (
        <div className={css(s.edit)}>
            <div className={css()}>
                {li.map((npc) => (
                    <QvButton key={npc.id}>{npc.base.name}</QvButton>
                ))}
            </div>
            <div>
                <div>角色1</div>
                <TextField />
            </div>
        </div>
    )
}

interface qvinput {
    value: string
    onChange: (str: string) => void
    style?: CSSProperties
}
function QvInput(p: qvinput) {
    return (
        <input
            type="text"
            value={p.value}
            onChange={(e) => {
                const str = e.target.value
                p.onChange(str)
            }}
            className={css(p.style)}
        />
    )
}
