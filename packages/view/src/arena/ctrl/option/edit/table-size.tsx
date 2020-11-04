// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$ } from '@/subject'
import { shallowCopy } from '@/rx/shallow-copy'
import { TextField } from 'office-ui-fabric-react'
import QvLabel from '@/component/ui/label'

export default function TableSize() {
    const opt = useObservable(() => editer_setting$.pipe(shallowCopy()))
    if (!opt) {
        return null
    }
    return (
        <>
            <label className={s.Label}>段首宽度(在编辑时按下alt + enter, 每个段落格式化为以设定数量的空格起始)</label>
            <div className={s.Font}>
                <div className={s.fontsize}>
                    <TextField
                        label="空格数"
                        value={(opt.table_size ?? 2) + ''}
                        onChange={(_, ns) => {
                            // console.log(ns)
                            const nn = Number(ns) || 0
                            opt.table_size = nn
                            editer_setting$.next(opt)
                        }}
                    ></TextField>
                </div>
            </div>
        </>
    )
}
