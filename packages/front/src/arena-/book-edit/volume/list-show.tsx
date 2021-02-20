import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { can_show_set$ } from './subj'

export default function ListShow(p: p) {
    return (
        <div
            className={css(style.ListShow)}
            onClick={() => {
                // p.toggle_set(true)
                can_show_set$.next(true)
            }}
        ></div>
    )
}

interface p {}
