import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { Icon, IconButton } from '@fluentui/react'
import { SubBookOption } from 'subject-/book-option'
import { SubBookEdit } from 'subject-/book-edit'

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
            <IconButton
                className={css(style.TopIcon)}
                iconProps={{ iconName: 'Settings' }}
                onClick={() => {
                    SubBookEdit.entry_show$.next('volume-set')
                }}
            ></IconButton>
            <IconButton
                className={css(style.TopIcon)}
                iconProps={{ iconName: 'Cancel' }}
                onClick={() => {
                    SubBookEdit.entry_show$.next('')
                    SubBookEdit.entry_hold_volume$.next(false)
                }}
            ></IconButton>
        </div>
    )
}

function VolBox() {
    const vols = useObservable(() => SubVolume.li$, [])
    const chap_use_id = useObservable(() => SubVolume.chapter_use_id$, '')
    return (
        <div className={css(style.VolBox)}>
            {vols.map((vol, i) => (
                <VolItem index={i} vol={vol} key={vol.id} chap_use_id={chap_use_id} />
            ))}
            {!vols.length && (
                <div
                    style={{
                        fontSize: 14,
                        padding: 20,
                        boxSizing: 'border-box',
                    }}
                >
                    没有章节
                </div>
            )}
        </div>
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
                SubBookOption.auto_save_recent_chapter(p.chap.id)
            }}
        >
            {p.chap.name}
        </div>
    )
}
