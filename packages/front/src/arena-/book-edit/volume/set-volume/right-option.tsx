import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { now_sel$, seled_chapter$, seled_chapter_n$, seled_volume$, seled_volume_n$ } from './sub'
import { PrimaryButton, TextField } from '@fluentui/react'
import { SubVolume } from 'subject-/volume'
import { mk_uuid } from 'tool-/uuid'

/**
 */
export default function RightOption() {
    return (
        <div className={css(style.RightOption)}>
            <TopInfor />
        </div>
    )
}

function TopInfor() {
    const now_sel = useObservable(() => now_sel$, 'none')
    const chap_n = useObservable(() => seled_chapter_n$, 0)
    const vol_n = useObservable(() => seled_volume_n$, 0)
    let txt = ''
    switch (now_sel) {
        case 'none':
            txt = '选择一个卷或章(按住shift多选)'
            break
        case 'chapter':
            txt = `已选择${chap_n}章`
            break

        default:
            txt = `已选择${vol_n}卷`
            break
    }
    return (
        <div
            style={{
                fontSize: 14,
            }}
        >
            <div>{txt}, 你是要?</div>
            {now_sel !== 'chapter' && <NewVolume />}
        </div>
    )
}

function NewVolume() {
    const [ipt, next_ipt] = useState('')
    return (
        <div className={css(style.ActionBlock)}>
            <div className={css(style.ActionBlockName)}>新建卷</div>
            <div>
                <TextField
                    value={ipt}
                    onChange={(_, ns) => {
                        const ns2 = ns || ''
                        next_ipt(ns2)
                    }}
                />
            </div>
            <div
                style={{
                    marginTop: 10,
                }}
            >
                <PrimaryButton
                    text="好"
                    onClick={() => {
                        const name = ipt.trim()
                        if (!name) {
                            alert('需要非空的名字')
                            return
                        }
                        const vols = SubVolume.vo_li$.value
                        const nvol: volume_vo = {
                            id: mk_uuid(),
                            name,
                            children: [],
                            expand: true,
                        }
                        const nvols = [...vols, nvol]
                        SubVolume.save(nvols)
                        SubVolume.load()
                        // SubVolume.vo_li$.next()
                        console.log('vols', vols)
                    }}
                />
            </div>
        </div>
    )
}
