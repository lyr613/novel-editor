import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import ChapterSlider from 'component-/chapter-slider'
import { Checkbox, Stack, TextField } from '@fluentui/react'
import { StyleMake } from 'style-/global'
import { useObservable } from 'rxjs-hooks'
import { _filter$ } from '../subj'
import { shallowCopy } from 'tool-/rx-shallow-copy'

/**
 */
export default function FilterRow() {
    return (
        <div className={css(style.FilterRow)}>
            <Checkboxs />
            <ChapterSlider></ChapterSlider>
        </div>
    )
}

function Checkboxs() {
    const obj = useObservable(() => _filter$.pipe(shallowCopy()), null)
    if (!obj) {
        return (
            <div
                style={{
                    height: 40,
                }}
            ></div>
        )
    }
    return (
        <Stack className={css(style.Checkboxs)} horizontal verticalAlign="center">
            <Checkbox
                label="全部显示"
                checked={obj.all}
                onChange={(_, b0) => {
                    const b = !!b0
                    obj.all = b

                    if (b) {
                        // console.log('bb2bb', b)
                        obj.chapter = false
                        obj.name = ''
                    }

                    _filter$.next(obj)
                }}
            ></Checkbox>
            <div className={css(StyleMake.wh(20))}></div>
            <Checkbox
                label="活跃章节"
                checked={obj.chapter}
                onChange={(_, b0) => {
                    const b = !!b0

                    obj.chapter = b
                    if (b) {
                        obj.all = false
                    }
                    if (!b && !obj.name) {
                        obj.all = true
                    }
                    _filter$.next(obj)
                }}
            ></Checkbox>
            <div className={css(StyleMake.wh(20))}></div>
            <TextField
                placeholder="名称搜索"
                value={obj.name}
                onChange={(_, b) => {
                    obj.name = b || ''
                    obj.all = false
                    if (!obj.name && !obj.chapter) {
                        obj.all = true
                    }
                    _filter$.next(obj)
                }}
                onDoubleClick={() => {
                    obj.name = ''
                    if (!obj.name && !obj.chapter) {
                        obj.all = true
                    }
                    _filter$.next(obj)
                }}
            ></TextField>
        </Stack>
    )
}
