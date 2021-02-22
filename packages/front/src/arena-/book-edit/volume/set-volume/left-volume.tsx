import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { now_sel$, seled_volume$ } from './sub'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'

/**
 */
export default function LeftVolume() {
    const vols = useObservable(() => SubVolume.vo_li$, [])
    const seled = useObservable(() => seled_volume$, [-1, -1])
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
                now_sel$.next('volume')
                const sh = e.shiftKey
                if (!sh) {
                    seled_volume$.next([p.index, p.index])
                    return
                }
                const n2 = seled_volume$.value
                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    seled_volume$.next([n2[0], p.index])
                } else {
                    seled_volume$.next([n2[1], p.index])
                }
            }}
        >
            <Icon iconName="OpenFolderHorizontal" />
            {/* <Icon iconName="Page" /> */}
            <div className={css(style.VolumeItemName)}>{p.vol.name}</div>
        </div>
    )
}
