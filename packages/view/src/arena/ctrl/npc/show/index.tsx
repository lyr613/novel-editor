// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Bar from './bar'
import ListLike from './list'
import { npc_find$, chapter_list_find$ } from '@/source'

export default function Show() {
	useEffect(() => {
		npc_find$.next()
		chapter_list_find$.next()
	}, [])
	return (
		<div className={s.Show}>
			<Bar></Bar>
			<ListLike></ListLike>
		</div>
	)
}
