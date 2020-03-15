// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton } from 'office-ui-fabric-react'
import { theme_colors, editer_setting$ } from '@/subject'
import ThemeButton from '@/component/theme-button'
import Sensitive from './sensitive'

/** 设置 */
export default function Option() {
	return (
		<div className={s.Option}>
			<FullScreen />
			<Theme />
			<Sensitive />
		</div>
	)
}

/** 设置主题 */
function Theme() {
	const clrs = theme_colors
	const clrs_key = Object.keys(clrs)
	const clrs_value = Object.values(clrs).map(v => v[4])

	return (
		<>
			<label className={s.label}>主题</label>
			<div className={s.Theme}>
				{clrs_value.map((clr, i) => (
					<div
						className={s.clrblock}
						style={{
							backgroundColor: clr,
						}}
						key={clr}
						onClick={() => {
							const t = clrs_key[i]
							const es = editer_setting$.value
							es.common.theme = t as 'word'
							editer_setting$.next(es)
						}}
					></div>
				))}
			</div>
		</>
	)
}

/** 全屏 */
function FullScreen() {
	return (
		<>
			<label className={s.label}>全屏</label>
			<div className={s.FullScreen}>
				<ThemeButton
					add_class={[s.btn]}
					onClick={() => {
						try {
							document.documentElement.requestFullscreen()
						} catch (error) {}
					}}
				>
					全屏
				</ThemeButton>
				<DefaultButton
					className={s.btn}
					onClick={() => {
						try {
							if (document.fullscreen) {
								document.exitFullscreen()
							}
						} catch (error) {}
					}}
				>
					退出全屏
				</DefaultButton>
			</div>
		</>
	)
}
