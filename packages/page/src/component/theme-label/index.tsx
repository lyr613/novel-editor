// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { Label, ILabelProps } from 'office-ui-fabric-react'
import { style as s } from './style'
import { css } from 'aphrodite'
interface p {
    add_class?: string[]
}

export default function ThemeLabel(p: ILabelProps & p) {
    const cls = [css(s.root), ...(p.add_class || [])].join(' ')
    return <Label {...p} className={cls}></Label>
}
