import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import ListShow from './list-show'
import SetIt from './set-volume'
import { useObservable } from 'rxjs-hooks'
import { can_show_set$ } from './subj'

/**
 */
export default function LeftVolume() {
    const can_show_set = useObservable(() => can_show_set$, false)
    return (
        <div className={css(style.volume)}>
            <ListShow />
            {can_show_set && <SetIt />}
        </div>
    )
}
