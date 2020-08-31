// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { help_li, help_use$ } from './subj'
import { style as s } from './style'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import Father from './about/father'
import Next from './about/next'
import Hotkey from './action/hotkey'
import Incident from './incident'
import Table from './table'
import Git from './git'
import Becareful from './about/becareful'
import QvLabel from '@/component/ui/label'

/** 帮助 */
export default function Help() {
    const use = useObservable(() => help_use$)

    return (
        <div>
            <Nav />
            {use === help_li[0] && <Becareful />}
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
        <div className={css(s.nav, gs.flhc, sc.wh('100%', 40), sc.bgclrl(7))}>
            {help_li.map((v) => (
                <QvLabel
                    key={v}
                    add_class={[css(s.nav_item, sc.padd(5, 10), use === v ? s.nav_item_use : undefined)]}
                    onClick={() => {
                        help_use$.next(v)
                    }}
                >
                    {v}
                </QvLabel>
            ))}
        </div>
    )
}
