import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s, preset_style } from './style'
import { StyleSheet, CSSProperties } from 'aphrodite'

interface p {
    children: string
    style?: CSSProperties
    disabled?: boolean
    add_class?: string[]
    onClick?: () => void
    onDoubleClick?: () => void
}
/** Label */
export default function QvLabel(p: p) {
    const add_style = StyleSheet.create({
        root: p.style || {},
        disabled: p.disabled ? preset_style.disable : {},
        click: !!p.onClick ? preset_style.canClick : {},
    })
    const add_class = ' ' + (p.add_class ?? []).join(' ')
    return (
        <div
            className={css(s.root, sc.fts(14), add_style.root, add_style.click, add_style.disabled) + add_class}
            onClick={p.disabled ? undefined : p.onClick}
            onDoubleClick={p.disabled ? undefined : p.onDoubleClick}
        >
            {p.children}
        </div>
    )
}
