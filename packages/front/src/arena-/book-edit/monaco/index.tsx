import React, { useState, useEffect, useRef, Suspense } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import * as monaco from 'monaco-editor'
import { SubMonaco } from 'subject-/monaco'
import { useObservable } from 'rxjs-hooks'
import { SubVolume } from 'subject-/volume'
import { debounceTime, map } from 'rxjs/operators'

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
        const ob_load_txt = SubVolume.ca_use_txt$.subscribe((txt) => {
            editer.setValue(txt)
        })
        editer.onKeyUp(() => {
            const t = editer.getValue()
            const id = SubVolume.ca_use_id$.value
            SubVolume.will_write(id, t)
        })
        return () => {
            ob_load_txt.unsubscribe()
            editer.dispose()
        }
    }, [])
    return <div ref={ref} className={css(style.editer)}></div>
}
