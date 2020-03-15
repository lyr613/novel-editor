// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { outline_find$, chapter_focu$, outline_map$ } from '@/source'
import { show_format } from '@/function/text'

interface p {
	w: number
	h: number
}

export default function Outline(p: p) {
	return (
		<div
			className={s.Outline}
			style={{
				width: p.w + 'px',
				height: p.h + 'px',
			}}
		>
			<Head />
			<Show />
		</div>
	)
}

function Head() {
	const cpf = useObservable(() => chapter_focu$)

	return (
		<div className={s.Head}>
			<span className={s.txt}>大纲</span>
			<span className={s.cname}> {cpf?.name}</span>
		</div>
	)
}

/** 大纲描述 */
function Show() {
	const otmap = useObservable(() => outline_map$)
	const cpf = useObservable(() => chapter_focu$)
	useEffect(() => {
		outline_find$.next()
	}, [])
	if (!otmap) {
		return null
	}
	const txt = otmap[cpf?.id || 'all']?.text

	return <div className={s.Show}>{show_format(txt)}</div>
}
