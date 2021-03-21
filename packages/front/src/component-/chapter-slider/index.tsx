import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleMake, StylePreset } from 'style-/global'
import { Icon, TooltipHost } from '@fluentui/react-internal'
import { DirectionalHint, IconButton, Slider, Stack } from '@fluentui/react'

/**
 * 章节滑竿
 */
export default function ChapterSlider() {
    return (
        <div className={css(style.ChapterSlider)}>
            <Exact />
            <MainSlider />
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
    return (
        <div className={css(style.MainSlider)}>
            <Slider></Slider>
        </div>
    )
}
