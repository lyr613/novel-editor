import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { IconButton } from '@fluentui/react'
import { SubNpc } from 'subject-/npc'
import { BookEditNpc } from '../../subj'
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
                BookEditNpc.show_type$.next('edit')
            }}
        ></IconButton>
    )
}

function Esc() {
    return (
        <IconButton
            title="离开角色页"
            className={css(StyleMake.mar(0, 0, 0, 0))}
            iconProps={{ iconName: 'Cancel' }}
            onClick={() => {
                BookEditNpc.show_type$.next('icon')
            }}
        ></IconButton>
    )
}
