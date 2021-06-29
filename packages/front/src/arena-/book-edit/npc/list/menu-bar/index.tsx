import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { IconButton } from '@fluentui/react'
import { SubNpc } from 'subject-/npc'
import { StyleMake } from 'style-/global'
import { SubBookEdit } from 'subject-/book-edit'

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
                SubBookEdit.entry_show$.next('npc-set')
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
                SubBookEdit.entry_show$.next('')
            }}
        ></IconButton>
    )
}
