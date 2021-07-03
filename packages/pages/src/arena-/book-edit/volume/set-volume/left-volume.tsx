import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { _volume_set2 } from './sub'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'

/**
 */
export default function LeftVolume() {
    const vols = useObservable(() => SubVolume.li$, [])
    const sel_map = useObservable(() => _volume_set2.seled_l1_map$)
    if (!sel_map) {
        return null
    }
    return (
        <div
            className={css(style.LeftVolume)}
            onClick={() => {
                _volume_set2.clear()
            }}
        >
            {vols.map((vol, i) => (
                <VolumeItem key={i} index={i} vol={vol} sel_map={sel_map} />
            ))}
        </div>
    )
}

interface p {
    index: number
    vol: volume_vo
    sel_map: Map<string, boolean>
}
function VolumeItem(p: p) {
    const high_light = p.sel_map.get(p.vol.id)

    return (
        <div
            className={css(style.VolumeItem, high_light ? style.VolumeItemHigh : null)}
            onClick={(e) => {
                _volume_set2.click_l1(e, p.vol.id)
            }}
        >
            <Icon iconName="OpenFolderHorizontal" />
            {/* <Icon iconName="Page" /> */}
            <div className={css(style.VolumeItemName)}>{p.vol.name}</div>
        </div>
    )
}
