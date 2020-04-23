// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { theme_colors, editer_setting$ } from '@/subject'
import ThemeButton from '@/component/theme-button'
import Sensitive from './sensitive'
import { ipc } from '@/const'
import ThemeLabel from '@/component/theme-label'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'

/** 设置 */
export default function Option() {
    return (
        <div className={s.Option}>
            <FullScreen />
            <Theme />
            <Sensitive />
            <Font />
        </div>
    )
}

/** 设置主题 */
function Theme() {
    const clrs = theme_colors
    const clrs_key = Object.keys(clrs)
    const clrs_value = Object.values(clrs).map((v) => v[4])

    return (
        <>
            <label className={s.label}>主题</label>
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

/** 全屏 */
function FullScreen() {
    return (
        <>
            <label className={s.label}>全屏</label>
            <div className={s.FullScreen}>
                <ThemeButton
                    add_class={[s.btn]}
                    onClick={() => {
                        ipc().send('key-full-screen', true)
                    }}
                >
                    全屏
                </ThemeButton>
                <DefaultButton
                    className={s.btn}
                    onClick={() => {
                        ipc().send('key-full-screen', false)
                    }}
                >
                    退出全屏
                </DefaultButton>
            </div>
        </>
    )
}
const familys = Array.from({ length: 6 }, (_, i) => `syhei${i + 1}`)
/** 字体 */
function Font() {
    const opt = useObservable(() => editer_setting$.pipe(shallowCopy()))
    if (!opt) {
        return null
    }
    return (
        <>
            <label className={s.label}>字体</label>
            <div className={s.Font}>
                <div className={s.fontsize}>
                    <TextField
                        label="字号"
                        value={(opt?.font?.size ?? 16) + ''}
                        onChange={(_, ns) => {
                            console.log(ns)
                            const nn = Number(ns) || 0
                            if (opt.font) {
                                opt.font.size = nn
                            } else {
                                opt.font = {
                                    size: nn,
                                    family: 'syhei4',
                                }
                            }
                            editer_setting$.next(opt)
                        }}
                        onBlur={() => {
                            const nn = opt.font?.size ?? 16
                            const fi = Math.min(46, Math.max(16, nn))
                            if (opt.font) {
                                opt.font.size = fi
                            } else {
                                opt.font = {
                                    size: fi,
                                    family: 'syhei4',
                                }
                            }
                            editer_setting$.next(opt)
                        }}
                    ></TextField>
                </div>
                <ThemeLabel>字体</ThemeLabel>
                <div className={s.fontfamily}>
                    {familys.map((fm) => (
                        <div
                            className={[s.line, fm === opt.font?.family ? s.fontuse : ''].join(' ')}
                            key={fm}
                            style={{
                                fontFamily: fm,
                            }}
                            onClick={() => {
                                if (opt.font) {
                                    opt.font.family = fm
                                } else {
                                    opt.font = {
                                        size: 16,
                                        family: fm,
                                    }
                                }
                                editer_setting$.next(opt)
                            }}
                        >
                            使用这个字体
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
