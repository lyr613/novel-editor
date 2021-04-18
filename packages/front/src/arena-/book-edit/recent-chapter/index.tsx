import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { Icon, IconButton } from '@fluentui/react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { SubBookOption } from 'subject-/book-option'
import { map, switchMap } from 'rxjs/operators'
import { SubVolume } from 'subject-/volume'
import { ToolTranData } from 'tool-/tran-data'
import { StyleMake, StylePreset } from 'style-/global'

const iconing$ = new BehaviorSubject(true)

/**
 */
export default function RecentChapter() {
    const iconing = useObservable(() => iconing$, true)
    return iconing ? <IconType /> : <RecentList />
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(5)}
            title="最近章节"
            onClick={() => {
                iconing$.next(false)
            }}
        >
            <Icon iconName="Recent" />
        </div>
    )
}

function RecentList() {
    const recent_li = useObservable(
        () =>
            SubBookOption.option$.pipe(
                switchMap((book_opt) =>
                    SubVolume.li$.pipe(
                        map((vol_li) => {
                            const chaps = ToolTranData.flat_children<volume_vo, chapter_vo>(vol_li)
                            const m = ToolTranData.li2map(chaps)
                            const re_chaps = book_opt.last_20_chapter.map((id) => m.get(id)!).filter((v) => !!v)
                            return re_chaps
                        }),
                    ),
                ),
            ),
        [],
    )
    const editing = useObservable(() => SubVolume.chapter_use_id$, '')
    return (
        <div className={css(style.RecentList)}>
            <div
                className={css(StylePreset.flhc, StyleMake.wh('100%', 40))}
                style={{
                    boxSizing: 'border-box',
                    paddingLeft: 5,
                }}
            >
                <IconButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={() => {
                        iconing$.next(true)
                    }}
                ></IconButton>
            </div>
            {recent_li.map((chap) => (
                <div
                    className={css(StyleComp.select_item.item, editing === chap.id ? StyleComp.select_item.high : null)}
                    key={chap.id}
                    onClick={() => {
                        SubVolume.chapter_use_id$.next(chap.id)
                        const opt = SubBookOption.option$.value
                        opt.last_edit_chapter = chap.id
                        SubBookOption.save(opt)
                        SubBookOption.load()
                    }}
                >
                    {chap.name}
                </div>
            ))}
            {recent_li.length === 0 && (
                <div
                    style={{
                        padding: 20,
                        fontSize: 14,
                    }}
                >
                    没有最近编写章节
                </div>
            )}
        </div>
    )
}
