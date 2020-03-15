// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { TextField, MaskedTextField, PrimaryButton, Dropdown, Label } from 'office-ui-fabric-react'
import { sty_text } from './office-style'
import { useObservable } from 'rxjs-hooks'
import { map } from 'rxjs/operators'
import { npc_focu$, book_focu$ } from '@/source'
import { electron } from '@/const'
import { next_router } from '@/function/router'
import DateYMD from '@/component/date'
import ThemeButton from '@/component/theme-button'
import { shallowCopy } from '@/rx/shallow-copy'
import ThemeLabel from '@/component/theme-label'
import { get_ran_name } from './util-name'

const ipc = electron().ipcRenderer

export default function NpcForm() {
	return (
		<div className={s.Form}>
			<Base />
			<Uneed />
			<Confirm />
		</div>
	)
}

function Base() {
	const npc = useObservable(() => npc_focu$.pipe(shallowCopy()))
	if (!npc) {
		return null
	}
	const { base } = npc
	return (
		<section className={[s.section, s.base].join(' ')}>
			<p className={s.label}>基本信息</p>
			<ul className={s.ctrl}>
				<li className={s.flexrow}>
					<TextField
						className={s.input}
						label="姓名"
						value={base.name}
						required
						onChange={(_, str) => {
							const nstr = (str || '').trim()
							base.name = nstr
							npc_focu$.next(npc)
						}}
						autoComplete="off"
					></TextField>
					<ThemeLabel
						add_class={[s.namelabel]}
						onClick={() => {
							base.name = get_ran_name()
							npc_focu$.next(npc)
						}}
					>
						随机
					</ThemeLabel>
				</li>
				<li className={s.flexrow}>
					<Dropdown
						className={s.input}
						label="性别"
						selectedKey={base.gender}
						options={[
							{
								key: '0',
								text: '女',
							},
							{
								key: '1',
								text: '男',
							},
							{
								key: '2',
								text: '其他',
							},
						]}
						onChange={(_, opt) => {
							base.gender = (opt?.key ?? '0') as any
							npc_focu$.next(npc)
						}}
					></Dropdown>
				</li>
				{/* <li className={s.flexrow}>
					<DateYMD
						label="登场"
						value1={base.active[0]}
						value2={base.active[1]}
						value3={base.active[2]}
						onChange1={str => {
							base.active[0] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							base.active[1] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							base.active[2] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
					<span
						style={{
							lineHeight: '36px',
							fontSize: '16px',
							padding: '0 5px',
						}}
					>
						-
					</span>
					<DateYMD
						label="退场"
						value1={base.active[3]}
						value2={base.active[4]}
						value3={base.active[5]}
						onChange1={str => {
							base.active[3] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							base.active[4] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							base.active[5] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
				</li> */}
				<li className={s.row}>
					<TextField
						label="描述"
						value={npc.base.description}
						onChange={(_, ss) => {
							npc.base.description = ss || ''
							npc_focu$.next(npc)
						}}
						required
						multiline
						autoAdjustHeight
						resizable={false}
						styles={{
							root: {
								margin: '10px 0',
							},
						}}
					></TextField>
				</li>
			</ul>
		</section>
	)
}

/**
 * 扩展信息
 * 出生死亡, 人际关系
 */
function Uneed() {
	const npc = useObservable(() => npc_focu$.pipe(shallowCopy()))
	if (!npc) {
		return null
	}
	const { uneed } = npc
	return (
		<section className={[s.section, s.uneed].join(' ')}>
			<p className={s.label}>扩展信息</p>
			<ul className={s.ctrl}>
				<li className={s.flexrow}>
					<DateYMD
						label="出生"
						value1={uneed.life[0]}
						value2={uneed.life[1]}
						value3={uneed.life[2]}
						onChange1={str => {
							uneed.life[0] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							uneed.life[1] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							uneed.life[2] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
					<span
						style={{
							lineHeight: '36px',
							fontSize: '16px',
							padding: '0 5px',
						}}
					>
						-
					</span>
					<DateYMD
						label="离世"
						value1={uneed.life[3]}
						value2={uneed.life[4]}
						value3={uneed.life[5]}
						onChange1={str => {
							uneed.life[3] = str
							npc_focu$.next(npc)
						}}
						onChange2={str => {
							uneed.life[4] = str
							npc_focu$.next(npc)
						}}
						onChange3={str => {
							uneed.life[5] = str
							npc_focu$.next(npc)
						}}
					></DateYMD>
				</li>
				<li className={s.row}>
					<Label>别名</Label>
					<TextField
						className={s.input}
						value={npc.uneed.alias ?? ''}
						placeholder="多个别名以空格分割"
						onChange={(_, ns) => {
							ns = (ns || '').trim()
							npc.uneed.alias = ns
							npc_focu$.next(npc)
						}}
					></TextField>
				</li>
				<li className={s.row}>
					<Label>重要度</Label>
					<TextField
						className={s.input}
						value={(npc.uneed.important ?? 0) + ''}
						placeholder="重要度默认为最低 0"
						onChange={(_, ns) => {
							ns = (ns || '').replace(/[^0-9]/g, '')
							npc.uneed.important = Math.min(99999, Number(ns))
							npc_focu$.next(npc)
						}}
					></TextField>
				</li>
				<li className={s.row}>
					<Label>人际关系</Label>
				</li>
			</ul>
		</section>
	)
}

function Confirm() {
	return (
		<ThemeButton
			onClick={() => {
				const re = ipc.sendSync('npc-edit', book_focu$.value?.src, npc_focu$.value)
				if (re === true) {
					next_router('npc')
				} else {
					alert('意外错误, 清理npc.json重试')
				}
			}}
			style={{
				margin: '0 10px',
			}}
		>
			好
		</ThemeButton>
	)
}
