import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { volume_show_type$ } from '../subj'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { Icon } from '@fluentui/react'

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
        <div className={css(style.Top)}>
            <div
                className={css(style.TopIcon)}
                onClick={() => {
                    volume_show_type$.next('icon')
                }}
            >
                <Icon iconName="Cancel" />
            </div>
            <div
                className={css(style.TopIcon)}
                onClick={() => {
                    volume_show_type$.next('set')
                }}
            >
                <Icon iconName="Settings" />
            </div>
        </div>
    )
}

function VolBox() {
    const vols = useObservable(() => SubVolume.li$, [])
    const chap_use_id = useObservable(() => SubVolume.chapter_use_id$, '')
    return (
        <>
            {vols.map((vol, i) => (
                <VolItem index={i} vol={vol} key={vol.id} chap_use_id={chap_use_id} />
            ))}
        </>
    )
}

interface p_vol {
    index: number
    vol: volume_vo
    chap_use_id: string
}
function VolItem(p: p_vol) {
    return (
        <div className={css(style.VolItem)}>
            <div className={css(style.VolItemName)} title={p.vol.name}>
                {p.vol.name}
            </div>
            <div>
                {p.vol.children.map((chap, i) => (
                    <ChapItem key={chap.id} index={i} chap={chap} chap_use_id={p.chap_use_id} />
                ))}
            </div>
        </div>
    )
}

interface p_chap {
    index: number
    chap: chapter_vo
    chap_use_id: string
}
function ChapItem(p: p_chap) {
    return (
        <div
            className={css(style.ChapItem, p.chap.id === p.chap_use_id ? style.ChapItemHigh : null)}
            title={p.chap.name}
            onClick={() => {
                SubVolume.chapter_use_id$.next(p.chap.id)
            }}
        >
            {p.chap.name}
        </div>
    )
}
