// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { outline_focu$, outline_map$ } from '@/source/outline'
import { map, take, filter } from 'rxjs/operators'
import { next_router } from '@/router/router'
import IncidentSelect from '@/component/incident'
import { shallowCopy } from '@/rx/shallow-copy'
import { chapter_map$ } from '@/source/chapter-node'
import { fs_write } from '@/source/fs-common'
import { get_cur_book_src } from '@/source/book'
import QvButton from '@/component/ui/button'

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
        <QvButton
            withTheme
            onClick={() => {
                const ot = outline_focu$.value!
                const mp = outline_map$.value
                mp[ot.id] = ot
                const b = fs_write('json', [get_cur_book_src(), 'outline'], mp)
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
        </QvButton>
    )
}
