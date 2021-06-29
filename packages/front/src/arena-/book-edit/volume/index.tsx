import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import ListShow from './list-show/index'
import SetIt from './set-volume'
import { useObservable } from 'rxjs-hooks'
import { Icon } from '@fluentui/react'
import { StyleTheme } from 'style-/theme'
import { StyleComp } from 'style-/comp'
import { SubBookEdit } from 'subject-/book-edit'

/**
 */
export default function LeftVolume() {
    const be = useObservable(() => SubBookEdit.entry_show$, '')
    const hold = useObservable(() => SubBookEdit.entry_hold_volume$, false)
    return (
        <>
            {be === 'volume-set' && <SetIt />}
            {hold && <ListShow />}
        </>
    )
}
