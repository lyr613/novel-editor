// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField, Toggle } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { map_focu$, be_editing$, map_list$, map_focu_id$ } from '../subj'
import { shallowCopy } from '@/rx/shallow-copy'
import ThemeLabel from '@/component/theme-label'
import { fs_write, book_use$ } from '@/source'

/** 右侧上面 工具选择 */
export default function Bar() {
    const focu = useObservable(() => map_focu$.pipe(shallowCopy()))
    const be_editing = useObservable(() => be_editing$, false)
    return (
        <div className={s.Bar}>
            <ThemeLabel
                onClick={() => {
                    const bks = book_use$.value?.src
                    const arr = map_list$.value
                    if (!bks) {
                        return
                    }
                    fs_write('json', [bks, 'map.json'], map_list$.value)
                    map_list$.next([...arr])
                }}
                add_class={[s.label]}
            >
                保存
            </ThemeLabel>
            <div className={s.hline}></div>

            <Toggle
                offText="查看模式"
                onText="编辑模式"
                checked={be_editing}
                onChange={(_, b) => {
                    const fid = map_focu_id$.value
                    if (!fid) {
                        alert('先选中一张地图')
                        return
                    }
                    be_editing$.next(!!b)
                }}
                styles={{
                    root: {
                        margin: '0 10px',
                    },
                }}
            ></Toggle>
            <div className={s.hline}></div>

            <TextField
                label="名称"
                value={focu?.name ?? '没有选择地图'}
                onChange={(_, ns) => {
                    ns = ns || ''
                    const focu = map_focu$.value
                    if (focu) {
                        focu.name = ns
                        map_focu$.next(focu)
                        const arr = map_list$.value
                        map_list$.next([...arr])
                    }
                }}
                underlined
                styles={{
                    root: {
                        margin: '0 10px',
                        width: '180px',
                    },
                    fieldGroup: {
                        backgroundColor: 'rgb(0,0,0,0)',
                    },
                }}
            ></TextField>
        </div>
    )
}
