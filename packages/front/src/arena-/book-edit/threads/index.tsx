import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { StyleComp } from 'style-/comp'
import { BookEditThreads } from './subj'
import { Icon } from '@fluentui/react'
import { useObservable } from 'rxjs-hooks'
import ThreadsEdit from './edit'
import { ipc } from 'tool-/electron'
import { SubBook } from 'subject-/book'

/**
 * 线索
 */
export default function Threads() {
    const t = useObservable(() => BookEditThreads.show_type$, 'icon')
    switch (t) {
        case 'icon':
            return <IconType />
        case 'edit':
            return <ThreadsEdit />

        default:
            break
    }
    return <IconType />
}

function IconType() {
    return (
        <div
            className={StyleComp.child_left_icons(4)}
            onClick={() => {
                // BookEditThreads.show_type$.next('edit')
                ipc().send('threads_vscode', SubBook.use_id$.value)
            }}
            title="线索"
        >
            <Icon iconName="BranchFork" />
        </div>
    )
}
