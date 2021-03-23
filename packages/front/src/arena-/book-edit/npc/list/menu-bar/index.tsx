import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { IconButton } from '@fluentui/react-internal/lib/compat/Button'
import { SubNpc } from 'subject-/npc'
import { _npc } from '../../subj'
import { StyleMake } from 'style-/global'

/**
 */
export default function MenuBar() {
    return (
        <div className={css(style.MenuBar)}>
            <Add />
            <Esc />
        </div>
    )
}

function Add() {
    return (
        <IconButton
            title="新角色"
            iconProps={{ iconName: 'Add' }}
            onClick={() => {
                SubNpc.edit$.next(SubNpc.make())
                _npc.show_type$.next('edit')
            }}
        ></IconButton>
    )
}

function Esc() {
    return (
        <IconButton
            title="离开角色页"
            className={css(StyleMake.mar(0, 0, 0, 'auto'))}
            iconProps={{ iconName: 'Cancel' }}
            onClick={() => {
                _npc.show_type$.next('icon')
            }}
        ></IconButton>
    )
}
