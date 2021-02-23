import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { _volume_set } from './sub'

/**
 */
export default function MidChapter() {
    const chapters = useObservable(() => _volume_set.show_chapters$, [])
    const seled = useObservable(() => _volume_set.seled_chapter$, [-1, -1])
    // console.log('seled', seled)

    const min = Math.min(...seled)
    const max = Math.max(...seled)
    return (
        <div className={css(style.MidChapter)}>
            {chapters.map((chap, i) => (
                <ChapterItem key={i} mini={min} maxi={max} index={i} chap={chap} />
            ))}
        </div>
    )
}

interface p {
    mini: number
    maxi: number
    index: number
    chap: chapter_vo
}
function ChapterItem(p: p) {
    const high_light = p.mini <= p.index && p.index <= p.maxi
    return (
        <div
            className={css(style.VolumeItem, high_light ? style.VolumeItemHigh : null)}
            onClick={(e) => {
                // console.log(e)
                _volume_set.now_sel$.next('chapter')
                const sh = e.shiftKey
                if (!sh) {
                    _volume_set.seled_chapter$.next([p.index, p.index])
                    return
                }
                const n2 = _volume_set.seled_chapter$.value
                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    _volume_set.seled_chapter$.next([n2[0], p.index])
                } else {
                    _volume_set.seled_chapter$.next([n2[1], p.index])
                }
            }}
        >
            {/* <Icon iconName="OpenFolderHorizontal" /> */}
            <Icon iconName="Page" />
            <div className={css(style.VolumeItemName)}>{p.chap.name}</div>
        </div>
    )
}
