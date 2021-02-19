import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'

/**
 * 文字编辑区
 */
export default function MonacoEdit() {
    const ref = useRef(null as any)
    useEffect(() => {
        const dom = ref.current
        const editer = monaco.editor.create(dom, SubMonaco.default_option)
        return () => {
            editer.dispose()
        }
    }, [])
    return (
        <div className={css(style.monaco)}>
            <div ref={ref} className={css(style.editer)}></div>
        </div>
    )
}
