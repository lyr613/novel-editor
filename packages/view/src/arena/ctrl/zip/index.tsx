// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import ThemeButton from '@/component/theme-button'
import { useObservable } from 'rxjs-hooks'
import { witch$, nav_li } from './subj'
import Import from './import'
import Exprt from './export'
import ThemeLabel from '@/component/theme-label'

/** 归档 */
export default function Zip() {
    const w = useObservable(() => witch$)
    return (
        <div className={s.Zip}>
            <Nav />
            {w === nav_li[0] && <Import></Import>}
            {w === nav_li[1] && <Exprt />}
        </div>
    )
}

function Nav() {
    const use = useObservable(() => witch$)
    useEffect(() => {
        return () => {
            witch$.next(nav_li[0])
        }
    }, [])
    return (
        <div className={s.Nav}>
            {nav_li.map((v) => (
                <ThemeLabel
                    key={v}
                    add_class={[s.item, use === v ? s.use : '']}
                    onClick={() => {
                        witch$.next(v)
                    }}
                >
                    {v}
                </ThemeLabel>
            ))}
        </div>
    )
}

function Bar() {
    return (
        <div className={s.Bar}>
            <ThemeButton
                add_class={[s.btn]}
                onClick={() => {
                    witch$.next('import')
                }}
            >
                导入
            </ThemeButton>
            <ThemeButton
                onClick={() => {
                    witch$.next('export')
                }}
            >
                导出
            </ThemeButton>
        </div>
    )
}
