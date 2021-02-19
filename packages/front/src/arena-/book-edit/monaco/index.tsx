import React, { useState, useEffect, useRef, Suspense } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { useObservable } from 'rxjs-hooks'

/**
 * 文字编辑区
 */
export default function MonacoEdit() {
    const loaded = useObservable(() => SubMonaco.did_load_monaco$)

    return (
        <div className={css(style.monaco)}>
            <Suspense fallback={null}>{loaded && <Box />}</Suspense>
        </div>
    )
}

function Box() {
    const ref = useRef(null as any)
    useEffect(() => {
        const dom = ref.current
        const editer = monaco.editor.create(dom, SubMonaco.default_option)
        return () => {
            editer.dispose()
        }
    }, [])
    return <div ref={ref} className={css(style.editer)}></div>
}
