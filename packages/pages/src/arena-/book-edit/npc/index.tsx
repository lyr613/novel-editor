import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import List from './list'
import Edit from './edit'
import Relationshap from './relationshap'
import { SubBookEdit } from 'subject-/book-edit'

/**
 */
export default function Npc() {
    const be = useObservable(() => SubBookEdit.entry_show$, '')
    return (
        <>
            {be === 'npc-view' && <List />}
            {be === 'npc-set' && <Edit />}
        </>
    )
}
