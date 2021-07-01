import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleMake, StylePreset } from 'style-/global'
import { DirectionalHint, IconButton, Slider, Stack } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'
import DialogSelChapter, { DialogSelChapterConfirmHook$, DialogSelChapterShow$ } from 'component-/dialog-sel-chapter'

/** 章节下标 */
export const ChapterSliderIndex$ = new BehaviorSubject(0)

/**
 * 章节滑竿
 */
export default function ChapterSlider() {
    return (
        <div className={css(style.ChapterSlider)}>
            <Exact />
            <MainSlider />
            <NameShow />
        </div>
    )
}

function Exact() {
    return (
        <div className={css(StyleMake.wh(40, 40), StylePreset.flwc, StylePreset.flhc)} title="选择章节">
            <IconButton
                iconProps={{ iconName: 'POI' }}
                onClick={() => {
                    DialogSelChapterConfirmHook$.next((vol, chap) => {
                        if (vol && chap) {
                            const mi = SubVolume.chaper_index_map
                            const i = mi.get(chap.id) ?? 0
                            ChapterSliderIndex$.next(i)
                        }
                    })
                    DialogSelChapterShow$.next(true)
                }}
            ></IconButton>
            <DialogSelChapter></DialogSelChapter>
        </div>
    )
}

function MainSlider() {
    const li = useObservable(() => SubVolume.chapter_li$, [])
    const index = useObservable(() => ChapterSliderIndex$, 0)

    return (
        <div className={css(style.MainSlider)}>
            {!!li.length && (
                <Slider
                    value={index}
                    onChange={(n) => {
                        ChapterSliderIndex$.next(n)
                    }}
                    min={0}
                    max={li.length - 1}
                    className={css(style.MainSliderSlider)}
                    showValue={false}
                ></Slider>
            )}
        </div>
    )
}

function NameShow() {
    const txt = useObservable(
        () =>
            ChapterSliderIndex$.pipe(
                map((i) => {
                    const chaps = SubVolume.chaper_li
                    const chap = chaps[i]
                    const vol = SubVolume.li$.value.find((v) => v.children.find((k) => k.id === chap.id))
                    const t1 = vol?.name || ''
                    const t2 = chap?.name || ''
                    return [t1, t2]
                }),
            ),
        ['', ''],
    )
    return (
        <div className={css(style.NameShow)}>
            <b className={css(style.NameShowVol)}>{txt[0]}</b>
            <span className={css(style.NameShowChap)}>{txt[1]}</span>
        </div>
    )
}
