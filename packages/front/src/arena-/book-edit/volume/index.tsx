import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import ListShow from './list-show'
import SetIt from './set-it'

/**
 */
export default function Volume() {
    const [can_show_set, next_can_show_set] = useState(false)
    return (
        <div className={css(style.volume)}>
            <ListShow toggle_set={next_can_show_set} />
            {can_show_set && <SetIt toggle_set={next_can_show_set} />}
        </div>
    )
}
