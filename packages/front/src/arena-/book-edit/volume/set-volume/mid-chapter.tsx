import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { now_sel$, seled_chapter$ } from './sub'

/**
 */
export default function MidChapter() {
    const seled = useObservable(() => seled_chapter$, [-1, -1])
    const min = Math.min(...seled)
    const max = Math.max(...seled)
    return (
        <div className={css(style.MidChapter)}>
            {Array(1000)
                .fill(1)
                .map((_, i) => (
                    <ChapterItem key={i} mini={min} maxi={max} index={i} />
                ))}
        </div>
    )
}

interface p {
    mini: number
    maxi: number
    index: number
}
function ChapterItem(p: p) {
    const high_light = p.mini <= p.index && p.index <= p.maxi
    return (
        <div
            className={css(style.VolumeItem, high_light ? style.VolumeItemHigh : null)}
            onClick={(e) => {
                // console.log(e)
                now_sel$.next('chapter')
                const sh = e.shiftKey
                if (!sh) {
                    seled_chapter$.next([p.index, p.index])
                    return
                }
                const n2 = seled_chapter$.value
                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    seled_chapter$.next([n2[0], p.index])
                } else {
                    seled_chapter$.next([n2[1], p.index])
                }
            }}
        >
            {/* <Icon iconName="OpenFolderHorizontal" /> */}
            <Icon iconName="Page" />
            <div className={css(style.VolumeItemName)}>
                名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字名字
            </div>
        </div>
    )
}
