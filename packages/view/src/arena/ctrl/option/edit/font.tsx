// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$ } from '@/subject'
import { shallowCopy } from '@/rx/shallow-copy'
import { TextField } from 'office-ui-fabric-react'
import QvLabel from '@/component/ui/label'

const familys = Array.from({ length: 6 }, (_, i) => `syhei${i + 1}`)
export default function Font() {
    const opt = useObservable(() => editer_setting$.pipe(shallowCopy()))
    if (!opt) {
        return null
    }
    return (
        <>
            <label className={s.Label}>字体</label>
            <div className={s.Font}>
                <div className={s.fontsize}>
                    <TextField
                        label="字号"
                        value={(opt?.font?.size ?? 16) + ''}
                        onChange={(_, ns) => {
                            // console.log(ns)
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
                <QvLabel>预置字体</QvLabel>
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
                                    opt.font.self = ''
                                } else {
                                    opt.font = {
                                        size: 18,
                                        family: fm,
                                        self: '',
                                    }
                                }
                                editer_setting$.next(opt)
                            }}
                        >
                            使用这个字体
                        </div>
                    ))}
                </div>
                <QvLabel>自定义字体</QvLabel>
                <div className={s.fontsize}>
                    <TextField
                        value={opt.font?.self ?? ''}
                        onChange={(_, ns) => {
                            const next = ns
                            if (opt.font) {
                                opt.font.self = next
                            } else {
                                opt.font = {
                                    size: 18,
                                    family: 'syhei2',
                                    self: next,
                                }
                            }
                            editer_setting$.next(opt)
                        }}
                    />
                </div>
            </div>
        </>
    )
}
