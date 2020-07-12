// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { theme_colors, editer_setting$ } from '@/subject'

/** 设置主题 */
export default function Theme() {
    const clrs = theme_colors
    const clrs_key = Object.keys(clrs)
    const clrs_value = Object.values(clrs).map((v) => v[4])
    return (
        <>
            <label className={s.Label}>主题</label>
            <div className={s.Theme}>
                {clrs_value.map((clr, i) => (
                    <div
                        className={s.clrblock}
                        style={{
                            backgroundColor: clr,
                        }}
                        key={clr}
                        onClick={() => {
                            const t = clrs_key[i]
                            const es = editer_setting$.value
                            es.common.theme = t as 'word'
                            editer_setting$.next(es)
                        }}
                    ></div>
                ))}
            </div>
        </>
    )
}
