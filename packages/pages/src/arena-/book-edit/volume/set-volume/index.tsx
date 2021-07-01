import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import LeftVolume from './left-volume'
import MidChapter from './mid-chapter'
import RightOption from './right-option'
import { _volume_set } from './sub'

/** 配置 */
export default function SetIt() {
    useEffect(() => {
        return () => {
            _volume_set.seled_chapter$.next([-1, -1])
            _volume_set.seled_volume$.next([-1, -1])
            _volume_set.now_sel$.next('none')
        }
    }, [])
    return (
        <div
            className={css(style.SetIt)}
            onClick={() => {
                // p.toggle_set(false)
                // can_show_set$.next(false)
            }}
        >
            <LeftVolume />
            <MidChapter />
            <RightOption />
        </div>
    )
}
