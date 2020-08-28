import React, { useState, useEffect } from 'react'
import { StyleSheet, CSSProperties } from 'aphrodite'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { useObservable } from 'rxjs-hooks'
import { editer_setting$, theme_colors } from '@/subject'

interface p {
    children: string
    style?: CSSProperties
    onClick?: () => void
    onDoubleClick?: () => void
    /** 主题色按钮 */
    withTheme?: boolean
    disabled?: boolean
}
/** Button */
export default function QvButton(p: p) {
    const eset = useObservable(() => editer_setting$)
    const theme = eset?.common.theme ?? 'word'
    const clrs = theme_colors

    const add_style = StyleSheet.create({
        root: p.style ?? {},
        theme: p.withTheme
            ? {
                  backgroundColor: clrs[theme][4],
                  border: `1px solid ${clrs[theme][4]}`,
                  color: 'white',
                  ':hover': {
                      backgroundColor: clrs[theme][3],
                      borderColor: clrs[theme][3],
                  },
              }
            : {},
        disabled: p.disabled
            ? {
                  borderColor: '#eeeeee',
                  backgroundColor: '#eeeeee',
                  color: 'gray',
                  cursor: 'unset',
                  ':hover': {
                      borderColor: '#eeeeee',
                      backgroundColor: '#eeeeee',
                      color: 'gray',
                  },
              }
            : {},
    })

    return (
        <button
            className={css(
                s.root,
                gs.pointer,
                sc.wh(undefined, 32),
                sc.fts(14),
                add_style.root,
                add_style.theme,
                add_style.disabled,
            )}
            onClick={p.disabled ? undefined : p.onClick}
            onDoubleClick={p.disabled ? undefined : p.onDoubleClick}
        >
            {p.children}
        </button>
    )
}
