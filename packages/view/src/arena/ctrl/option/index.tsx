// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField } from 'office-ui-fabric-react'
import { theme_colors, editer_setting$ } from '@/subject'
import Sensitive from './edit/sensitive'
import { ipc } from '@/const'
import ThemeLabel from '@/component/theme-label'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { option_use$, option_li } from './subj'
import WindowSize from './ui/full-screen'
import Theme from './ui/theme'
import Font from './edit/font'
import Scroll from './ui/scroll'

/** 设置 */
export default function Option() {
    const use = useObservable(() => option_use$)

    return (
        <div className={s.Option}>
            <Nav />
            {use === option_li[0] && <WindowSize />}
            {use === option_li[0] && <Theme />}
            {use === option_li[0] && <Scroll />}
            {use === option_li[1] && <Sensitive />}
            {use === option_li[1] && <Font />}
        </div>
    )
}

function Nav() {
    const use = useObservable(() => option_use$)
    useEffect(() => {
        return () => {
            option_use$.next(option_li[0])
        }
    }, [])
    return (
        <div className={s.Nav}>
            {option_li.map((v) => (
                <ThemeLabel
                    key={v}
                    add_class={[s.item, use === v ? s.use : '']}
                    onClick={() => {
                        option_use$.next(v)
                    }}
                >
                    {v}
                </ThemeLabel>
            ))}
        </div>
    )
}
