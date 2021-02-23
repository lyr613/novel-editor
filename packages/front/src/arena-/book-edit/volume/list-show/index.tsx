import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { can_show_set$ } from '../subj'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'

export default function ListShow() {
    return (
        <div className={css(style.ListShow)}>
            <Top />
            <VolBox />
        </div>
    )
}

function Top() {
    return (
        <div
            className={css(style.Top)}
            onClick={() => {
                can_show_set$.next(true)
            }}
        ></div>
    )
}

function VolBox() {
    const vols = useObservable(() => SubVolume.vo_li$, [])
    return (
        <>
            {vols.map((vol, i) => (
                <VolItem index={i} vol={vol} key={vol.id} />
            ))}
        </>
    )
}

interface p_vol {
    index: number
    vol: volume_vo
}
function VolItem(p: p_vol) {
    return (
        <div className={css(style.VolItem)}>
            <div className={css(style.VolItemName)} title={p.vol.name}>
                {p.vol.name}
            </div>
            <div>
                {p.vol.children.map((chap, i) => (
                    <ChapItem key={i} index={i} chap={chap} />
                ))}
            </div>
        </div>
    )
}

interface p_chap {
    index: number
    chap: chapter_vo
}
function ChapItem(p: p_chap) {
    return (
        <div className={css(style.ChapItem)} title={p.chap.name}>
            {p.chap.name}
        </div>
    )
}
