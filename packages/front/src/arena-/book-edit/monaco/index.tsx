import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as monaco from 'monaco-editor'

/**
 * 文字编辑区
 */
export default function MonacoEdit() {
    const ref = useRef(null as any)
    useEffect(() => {
        const dom = ref.current
        const editer = monaco.editor.create(dom)
    }, [])
    return <div ref={ref} className={css(style.root)}></div>
}
