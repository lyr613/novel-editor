import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useObservable } from 'rxjs-hooks'
import { StyleComp } from 'style-/comp'
import { Icon } from '@fluentui/react'
import SetCube from './set-cube'
import { SubBookEdit } from 'subject-/book-edit'

/**
 */
export default function Cube() {
    const be = useObservable(() => SubBookEdit.entry_show$, '')
    return <>{be === 'cube-set' && <SetCube />}</>
}
