import React, { useState, useEffect } from 'react'
import { css } from 'style-/aphrodite'
import { style as s, sty_mit } from './style'
import { StyleTheme } from 'style-/theme'
import { SubOption } from 'subject-/option'
import { useObservable } from 'rxjs-hooks'
import { PrimaryButton } from '@fluentui/react'

/** Ui */
export default function Ui() {
    useEffect(() => {
        setTimeout(() => {
            // load_option()
        }, 0)
    }, [])
    return (
        <div className={css(s.root)}>
            <Theme />
        </div>
    )
}

function Theme() {
    const opt = useObservable(() => SubOption.edit$)
    if (!opt) {
        return null
    }
    return (
        <section className={css(s.section)}>
            <h2 className={css(s.h2)}>主题</h2>
            {StyleTheme.list.map((clr) => (
                <div
                    key={clr.name}
                    className={css(s.themeItem)}
                    style={{
                        backgroundColor: clr.color.themePrimary,
                    }}
                    onClick={() => {
                        opt.ui.theme = clr.name
                        SubOption.edit$.next({ ...opt })
                        StyleTheme.use(clr.name)
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
            <PrimaryButton>啦啦</PrimaryButton>
        </section>
    )
}
