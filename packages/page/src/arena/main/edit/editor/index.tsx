import React, { useState, useEffect, useRef } from 'react'
import { css } from 'aphrodite'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { next_router, ROUTERL2 } from '@/router'
import * as monaco from 'monaco-editor'
import { default_editer_option } from '@/plugin/monaco-editer/option'

/** Editor */
export default function Editor() {
    const ref = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        //
        const dom = ref.current!
        const opt = default_editer_option()
        monaco.editor.create(dom, opt)
    }, [])
    return (
        <div
            className={css(s.root)}
            onClick={() => {
                // next_router('edit', ROUTERL2.edit.chapter_set)
            }}
        >
            <div ref={ref} className={css(sc.wh(600, 600))}></div>
        </div>
    )
}
