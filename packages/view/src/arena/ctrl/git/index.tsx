// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { ipc } from '@/const'
import { book_focu$ } from '@/source'
import { next_router } from '@/function/router'
import ThemeButton from '@/component/theme-button'

/** 史诗 */
export default function Git() {
	const [has, set_has] = useState<null | boolean>(null)
	useEffect(() => {
		if (book_focu$.value) {
			ipc().send('git_check', book_focu$.value?.src)
			ipc().once('git_check', (_, b) => {
				if (typeof b === 'boolean') {
					set_has(b)
				}
			})
		}
	}, [])
	if (!book_focu$.value) {
		next_router('shelf')
		return null
	}
	return (
		<div className={s.Git}>
			<SectionHeader> 史诗</SectionHeader>
			{has ? <Histroy /> : <NoHas />}
		</div>
	)
}

function Histroy() {
	return (
		<div className={s.Histroy}>
			<ThemeButton
				onClick={() => {
					// ipc().sendSync('git_save')
				}}
			>
				333
			</ThemeButton>
		</div>
	)
}

function NoHas() {
	return (
		<div className={s.NoHas}>
			<div>当前目录没有创建仓库</div>
			<ThemeButton
				onClick={() => {
					const b = ipc().sendSync('git_init', book_focu$.value?.src)
					console.log(b)
				}}
			>
				创建
			</ThemeButton>
		</div>
	)
}
