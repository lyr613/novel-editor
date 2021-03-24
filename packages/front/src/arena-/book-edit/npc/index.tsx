import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import { _npc } from './subj'
import List from './list'
import Edit from './edit'
import Relationshap from './relationshap'

/**
 */
export default function Npc() {
    const show_type = useObservable(() => _npc.show_type$, 'icon')
    return (
        <>
            {show_type === 'icon' && <IconType />}
            {show_type === 'list' && <List />}
            {show_type === 'edit' && <Edit />}
            {show_type === 'relationshap' && <Relationshap />}
        </>
    )
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(1)}
            onClick={() => {
                _npc.show_type$.next('list')
            }}
            title="角色"
        >
            <Icon iconName="People" />
        </div>
    )
}
