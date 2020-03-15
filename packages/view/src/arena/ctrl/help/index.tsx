// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { electron } from '@/const'
import ThemeLabel from '@/component/theme-label'
import SectionHeader from '@/component/section-header'
const ipc = electron().ipcRenderer

/** 帮助 */
export default function Help() {
	useEffect(() => {
		// ipc.on('test-app-path', (_, e) => {
		// 	console.log(e)
		// })
		// ipc.send('test-app-path')
	}, [])
	return (
		<div className={s.Help}>
			<HotKey />
			<Common />
			<Incident />
		</div>
	)
}

function HotKey() {
	return (
		<section className={s.HotKey}>
			<SectionHeader>快捷键</SectionHeader>

			<div className={s.aline}>退出: 快速连续两次 alt/command + q</div>
			<div className={s.aline}>重载app: alt/command + r</div>
		</section>
	)
}

/** 通用 */
function Common() {
	return (
		<section className={s.Common}>
			<SectionHeader>通用</SectionHeader>
			<div className={s.aline}>删除: 删除按钮双击才会生效</div>
		</section>
	)
}

/** 事件 */
function Incident() {
	return (
		<section className={s.Incident}>
			<SectionHeader>事件</SectionHeader>
			<div className={s.aline}>
				节奏线: 顶部的节奏线, 根据线索设置的开始结束章节字数绘制成. 单击方块可以选中对应事件,
				双击可以使对应事件进入可视区域
			</div>
			<div className={s.aline}>线索: 多线叙事使用, 清晰事件节奏</div>
		</section>
	)
}
/**  */
function SSSS() {
	return (
		<section className={s.Incident}>
			<SectionHeader>通用</SectionHeader>
		</section>
	)
}
