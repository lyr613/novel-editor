import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { can_show_set$ } from '../subj'

/** 配置 */
export default function SetIt(p: p) {
    return (
        <div
            className={css(style.SetIt)}
            onClick={() => {
                // p.toggle_set(false)
                can_show_set$.next(false)
            }}
        >
            <LeftVolume />
            <MidChapter />
            <RightBox />
        </div>
    )
}

interface p {}

function LeftVolume() {
    return (
        <div className={css(style.LeftVolume)}>
            <div></div>
        </div>
    )
}

function MidChapter() {
    return (
        <div className={css(style.LeftVolume)}>
            <div></div>
        </div>
    )
}

function RightBox() {
    return (
        <div className={css(style.RightBox)}>
            <div></div>
        </div>
    )
}
