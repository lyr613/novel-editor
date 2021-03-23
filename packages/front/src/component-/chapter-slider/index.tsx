import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleMake, StylePreset } from 'style-/global'
import { Icon, TooltipHost } from '@fluentui/react-internal'
import { DirectionalHint, IconButton, Slider, Stack } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

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
        <div className={css(StyleMake.wh(40, 40), StylePreset.flwc, StylePreset.flhc)}>
            <IconButton iconProps={{ iconName: 'POI' }}></IconButton>
        </div>
    )
}

function MainSlider() {
    const li = useObservable(() => SubVolume.chapter_li$, [])
    const [index, next_index] = useState(0)

    return (
        <div className={css(style.MainSlider)}>
            {!!li.length && (
                <Slider
                    value={index}
                    onChange={(n) => {
                        ChapterSliderIndex$.next(n)
                        next_index(n)
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
                    const t2 = chap.name
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
