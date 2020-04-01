// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField, DefaultButton, PrimaryButton, ActionButton, Label } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { outline_focu$, outline_map$ } from '@/source/outline'
import { map, take, filter } from 'rxjs/operators'
import { book_use$, npc_li$, chapter_map$, fs_write } from '@/source'
import { next_router } from '@/function/router'
import IncidentSelect from '@/component/incident'
import ThemeButton from '@/component/theme-button'
import { shallowCopy } from '@/rx/shallow-copy'

export default function Form() {
    return (
        <>
            <Base />
            <Confirm />
        </>
    )
}

/**
 * 大纲文本, 事件
 */
function Base() {
    const outline = useObservable(() =>
        outline_focu$.pipe(
            filter((v) => !!v),
            shallowCopy(),
        ),
    )
    const chapter_map = useObservable(() => chapter_map$)
    if (!outline || !chapter_map) {
        return null
    }

    return (
        <>
            <label className={s.commlabel}>{chapter_map.get(outline.id)?.name ?? '总纲'} </label>
            <section className={[s.base, s.section].join(' ')}>
                <TextField
                    multiline
                    autoAdjustHeight
                    resizable={false}
                    value={outline.text}
                    onChange={(_, str) => {
                        const ns = str || ''
                        outline.text = ns
                        outline_focu$.next(outline)
                    }}
                    styles={{
                        root: {
                            marginBottom: '10px',
                        },
                    }}
                ></TextField>
                <IncidentSelect
                    label="相关事件"
                    did_ids={outline.incident_ids}
                    on_plus={(inci) => {
                        outline.incident_ids.push(inci.id)
                        outline_focu$.next(outline)
                    }}
                    on_reduce={(inci) => {
                        outline.incident_ids = outline.incident_ids.filter((id) => id !== inci.id)
                        outline_focu$.next(outline)
                    }}
                ></IncidentSelect>
            </section>
        </>
    )
}

/**
 * 确认
 */
function Confirm() {
    return (
        <ThemeButton
            onClick={() => {
                const ot = outline_focu$.value!
                const mp = outline_map$.value
                mp[ot.id] = ot
                const booksrc = book_use$.value?.src!
                const b = fs_write('json', [booksrc, 'outline'], mp)
                if (b) {
                    next_router('outline')
                } else {
                    alert('保存失败')
                }
            }}
            style={{
                margin: '10px',
            }}
        >
            好
        </ThemeButton>
    )
}
