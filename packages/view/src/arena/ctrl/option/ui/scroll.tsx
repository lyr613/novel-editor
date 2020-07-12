// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField } from 'office-ui-fabric-react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { debounceTime, map } from 'rxjs/operators'
import { shallowCopy } from '@/rx/shallow-copy'
import { editer_setting$ } from '@/subject'
import { overload_style_scroll } from '@/util/style-overload'

export default function Scroll() {
    const edit = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const form = edit?.common.scroll ?? {
        width: '',
        color: '',
    }
    useEffect(() => {
        const ob = editer_setting$.pipe(debounceTime(1000)).subscribe((form) => {
            overload_style_scroll()
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    if (!edit || !form) {
        return null
    }
    return (
        <>
            <label className={s.Label}>滚动条</label>
            <div className={s.Scroll}>
                <TextField
                    label="宽度"
                    value={form.width}
                    onChange={(_, ns) => {
                        ns = ns || ''
                        form.width = ns
                        edit.common.scroll = form
                        editer_setting$.next(edit)
                    }}
                ></TextField>
                <TextField
                    label="背景色"
                    placeholder="格式: #ff0000 或 rgba(255, 0, 0, 0.3)"
                    value={form.color}
                    onChange={(_, ns) => {
                        ns = ns || ''
                        form.color = ns
                        edit.common.scroll = form
                        editer_setting$.next(edit)
                    }}
                ></TextField>
            </div>
        </>
    )
}
