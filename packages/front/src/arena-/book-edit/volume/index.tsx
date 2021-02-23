import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import ListShow from './list-show/index'
import SetIt from './set-volume'
import { useObservable } from 'rxjs-hooks'
import { volume_show_type$ } from './subj'
import { Icon } from '@fluentui/react'
import { themes } from 'style-/theme'
import { StyleComp } from 'style-/comp'

/**
 */
export default function LeftVolume() {
    const tp = useObservable(() => volume_show_type$, 'icon')
    return (
        <>
            {tp === 'icon' && <IconType />}
            {tp === 'set' && <SetIt />}
            {tp === 'tree' && <ListShow />}
        </>
    )
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(0)}
            onClick={() => {
                volume_show_type$.next('tree')
            }}
        >
            <Icon iconName="Page" />
        </div>
    )
}
