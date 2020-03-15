// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'

interface p {
	children: any
	add_class?: string[]
	onClick?: () => void
}

export default function SectionHeader(p: p) {
	const cls = [s.SectionHeader, ...(p.add_class || [])].join(' ')
	return (
		<header className={cls} onClick={p.onClick}>
			{p.children}
		</header>
	)
}
