import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'

/** Ui */
export default function Ui() {
    return (
        <div className={css(s.root)}>
            <Theme />
        </div>
    )
}

function Theme() {
    return (
        <section className={css(s.section)}>
            <h2 className={css(s.h2)}>主题</h2>
        </section>
    )
}
