// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Label, ILabelProps } from 'office-ui-fabric-react'

interface p {
	add_class?: string[]
}

export default function ThemeLabel(p: ILabelProps & p) {
	const cls = [s.label, ...(p.add_class || [])].join(' ')
	return <Label {...p} className={cls}></Label>
}
