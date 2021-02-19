import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'

export default function ListShow(p: p) {
    return (
        <div
            className={css(style.ListShow)}
            onClick={() => {
                p.toggle_set(true)
            }}
        ></div>
    )
}

interface p {
    /** 切换展示设置页 */
    toggle_set: Function
}
