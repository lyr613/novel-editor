import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { _volume_set } from './sub'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'

/**
 */
export default function LeftVolume() {
    const vols = useObservable(() => SubVolume.li$, [])
    const seled = useObservable(() => _volume_set.seled_volume$, [-1, -1])
    const min = Math.min(...seled)
    const max = Math.max(...seled)
    return (
        <div className={css(style.LeftVolume)}>
            {vols.map((vol, i) => (
                <VolumeItem key={i} mini={min} maxi={max} index={i} vol={vol} />
            ))}
        </div>
    )
}

interface p {
    mini: number
    maxi: number
    index: number
    vol: volume_vo
}
function VolumeItem(p: p) {
    const high_light = p.mini <= p.index && p.index <= p.maxi

    return (
        <div
            className={css(style.VolumeItem, high_light ? style.VolumeItemHigh : null)}
            onClick={(e) => {
                // console.log(e)
                _volume_set.seled_chapter$.next([-1, -1])

                _volume_set.now_sel$.next('volume')
                const sh = e.shiftKey
                if (!sh) {
                    _volume_set.seled_volume$.next([p.index, p.index])
                    return
                }

                const n2 = _volume_set.seled_volume$.value
                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    _volume_set.seled_volume$.next([n2[0], p.index])
                } else {
                    _volume_set.seled_volume$.next([n2[1], p.index])
                }
            }}
        >
            <Icon iconName="OpenFolderHorizontal" />
            {/* <Icon iconName="Page" /> */}
            <div className={css(style.VolumeItemName)}>{p.vol.name}</div>
        </div>
    )
}
