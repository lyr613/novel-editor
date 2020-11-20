import React, { useState, useEffect } from 'react'
import { css } from 'style-/aphrodite'
import { style as s, sty_mit } from './style'
import { themes } from 'style-/theme'
import OfficeButton from 'component-/button'
import { ipc } from 'tool-/electron'
import { load_option, option$ } from 'subject-/option'
import { useObservable } from 'rxjs-hooks'

/** Ui */
export default function Ui() {
    useEffect(() => {
        setTimeout(() => {
            load_option()
        }, 0)
    }, [])
    return (
        <div className={css(s.root)}>
            <Theme />
        </div>
    )
}

function Theme() {
    const opt = useObservable(() => option$)
    if (!opt) {
        return null
    }
    return (
        <section className={css(s.section)}>
            <h2 className={css(s.h2)}>主题</h2>
            {themes.list.map((clr) => (
                <div
                    key={clr.name}
                    className={css(s.themeItem)}
                    style={{
                        backgroundColor: clr.color.themePrimary,
                    }}
                    onClick={() => {
                        opt.ui.theme = clr.name
                        option$.next({ ...opt })
                    }}
                >
                    <div
                        className={css(sty_mit.inner)}
                        style={{
                            borderColor: opt.ui.theme === clr.name ? clr.color.themeLight : 'transparent',
                        }}
                    ></div>
                </div>
            ))}
            <OfficeButton with_theme>啦啦</OfficeButton>
        </section>
    )
}
