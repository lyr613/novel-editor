// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { help_li, help_use$ } from './subj'
import ThemeLabel from '@/component/theme-label'
import { useObservable } from 'rxjs-hooks'
import Father from './about/father'
import Next from './about/next'
import Hotkey from './action/hotkey'
import Incident from './incident'
import Table from './table'
import Git from './git'

/** 帮助 */
export default function Help() {
    const use = useObservable(() => help_use$)

    return (
        <div className={s.Help}>
            <Nav />
            {use === help_li[0] && <Father />}
            {use === help_li[0] && <Next />}
            {use === help_li[1] && <Hotkey />}
            {use === help_li[2] && <Incident />}
            {use === help_li[3] && <Table />}
            {use === help_li[4] && <Git />}
        </div>
    )
}

function Nav() {
    const use = useObservable(() => help_use$)
    useEffect(() => {
        return () => {
            help_use$.next(help_li[0])
        }
    }, [])
    return (
        <div className={s.Nav}>
            {help_li.map((v) => (
                <ThemeLabel
                    key={v}
                    add_class={[s.item, use === v ? s.use : '']}
                    onClick={() => {
                        help_use$.next(v)
                    }}
                >
                    {v}
                </ThemeLabel>
            ))}
        </div>
    )
}
