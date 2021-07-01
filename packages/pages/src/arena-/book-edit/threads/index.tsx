import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import ThreadsEdit from './edit'
import { ipc } from 'tool-/electron'
import { SubBook } from 'subject-/book'
import { SubBookEdit } from 'subject-/book-edit'

/**
 * 线索
 */
export default function Threads() {
    const be = useObservable(() => SubBookEdit.entry_show$, '')
    switch (be) {
        case 'threads-set':
            return <ThreadsEdit />

        default:
            break
    }
    return null
}
