import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'

/** 配置 */
export default function SetIt(p: p) {
    return (
        <div
            className={css(style.SetIt)}
            onClick={() => {
                p.toggle_set(false)
            }}
        ></div>
    )
}

interface p {
    /** 切换展示设置页 */
    toggle_set: Function
}
