import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { _cube } from './sub'
import { StyleComp } from 'style-/comp'
import { Icon } from '@fluentui/react'
import SetCube from './set-cube'

/**
 */
export default function Cube() {
    const st = useObservable(() => _cube.show_type$, 'icon')
    return (
        <>
            {st === 'icon' && <IconType />}
            {st === 'edit' && <SetCube />}
        </>
    )
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(2)}
            onClick={() => {
                _cube.show_type$.next('edit')
            }}
            title="词条"
        >
            <Icon iconName="CubeShape" />
        </div>
    )
}
