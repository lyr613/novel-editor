import React, { useState, useEffect } from 'react'
import { css } from 'style-/aphrodite'
import { style as s, sty_mit } from './style'
import { themes } from 'style-/theme'
import OfficeButton from 'component-/button'

/** Ui */
export default function Ui() {
    return (
        <div className={css(s.root)}>
            <Theme />
        </div>
    )
}

function Theme() {
    const [theme, next_theme] = useState('')
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
                        next_theme(clr.name)
                    }}
                >
                    <div
                        className={css(sty_mit.inner)}
                        style={{
                            borderColor: theme === clr.name ? clr.color.themeLight : 'transparent',
                        }}
                    ></div>
                </div>
            ))}
            <OfficeButton with_theme>啦啦</OfficeButton>
        </section>
    )
}
