import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { _volume_set2 } from './sub'
import { SubVolume } from 'subject-/volume'

/**
 */
export default function MidChapter() {
    const chapters = useObservable(() => _volume_set2.l2_can_show_li$, [])
    const sel_map = useObservable(() => _volume_set2.seled_l2_map$, new Map())

    // console.log('seled', seled)

    return (
        <div
            className={css(style.MidChapter)}
            onClick={() => {
                _volume_set2.seled_l2_map$.next(new Map())
            }}
        >
            {chapters.map((chap, i) => (
                <ChapterItem key={i} index={i} chap={chap} sel_map={sel_map} />
            ))}
        </div>
    )
}

interface p {
    index: number
    chap: chapter_vo
    sel_map: Map<string, boolean>
}
function ChapterItem(p: p) {
    const high_light = !!p.sel_map.get(p.chap.id)
    return (
        <div
            className={css(style.VolumeItem, high_light ? style.VolumeItemHigh : null)}
            onClick={(e) => {
                // console.log(e)
                _volume_set2.click_l2(e, p.chap.id)
            }}
        >
            {/* <Icon iconName="OpenFolderHorizontal" /> */}
            <Icon iconName="Page" />
            <div className={css(style.VolumeItemName)}>{p.chap.name}</div>
        </div>
    )
}
