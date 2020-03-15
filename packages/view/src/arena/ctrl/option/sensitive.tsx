// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { sensitive_sg } from '@/storage/sensitive'
import ThemeLabel from '@/component/theme-label'
import ThemeButton from '@/component/theme-button'
import { Dialog, DialogType, TextField, DialogFooter, DefaultButton, Label } from 'office-ui-fabric-react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { sensitive_list$ } from '@/subject/sensitive'
import { map } from 'rxjs/operators'
import { shallowCopy } from '@/rx/shallow-copy'

const will_delete$ = new BehaviorSubject('')

/** 敏感词 */
export default function Sensitive() {
	return (
		<>
			<label className={s.label}>敏感词</label>

			<div className={s.Sensitive}>
				<List />
				<AddOne />
				<DeleteOne />
			</div>
		</>
	)
}

function List() {
	const list = useObservable(() => sensitive_list$.pipe(shallowCopy()), [])

	return (
		<div className={s.List}>
			{list.map(word => (
				<ThemeLabel
					key={word}
					add_class={[s.one]}
					onClick={() => {
						will_delete$.next(word)
					}}
				>
					{word}
				</ThemeLabel>
			))}
		</div>
	)
}

function AddOne() {
	const [show, set_show] = useState(false)
	const [word, set_word] = useState('')

	return (
		<>
			<ThemeButton
				className={s.new}
				onClick={() => {
					set_show(true)
				}}
			>
				添加
			</ThemeButton>
			<Dialog
				hidden={!show}
				onDismiss={() => {
					set_show(false)
				}}
				modalProps={{
					isBlocking: true,
					topOffsetFixed: true,
				}}
				dialogContentProps={{
					type: DialogType.normal,
					closeButtonAriaLabel: 'Close',
					title: '添加敏感词',
					subText: '多个敏感词以空格分割',
				}}
			>
				<TextField
					value={word}
					onChange={(_, ns) => {
						const nss = (ns || '').trimStart()
						set_word(nss)
					}}
				></TextField>
				<DialogFooter>
					<ThemeButton
						disabled={!word.length}
						onClick={() => {
							// const list = sensitive_list$.value
							// if (!list.includes(word)) {
							// 	list.push(word)
							// 	sensitive_list$.next(list)
							// }
							_add_words(word)
							set_show(false)
							set_word('')
						}}
					>
						好
					</ThemeButton>
					<DefaultButton
						onClick={() => {
							set_show(false)
						}}
					>
						取消
					</DefaultButton>
				</DialogFooter>
			</Dialog>
		</>
	)
}

function _add_words(ws: string) {
	const words = ws.split(/\s+/)
	const arr = [...sensitive_list$.value]
	words.forEach(word => {
		add_one(word)
	})
	sensitive_list$.next(arr)
	function add_one(word: string) {
		for (let i = 0; i < arr.length; i++) {
			let [a, b] = [arr[i], word]
			if (a.length > b.length) {
				;[a, b] = [b, a]
			}
			if (b.includes(a)) {
				arr[i] = a
				return
			}
		}
		arr.push(word)
	}
}

function DeleteOne() {
	const word = useObservable(() => will_delete$)
	const show = !!word

	return (
		<Dialog
			hidden={!show}
			onDismiss={() => {
				will_delete$.next('')
			}}
			modalProps={{
				isBlocking: true,
				topOffsetFixed: true,
			}}
			dialogContentProps={{
				type: DialogType.normal,
				closeButtonAriaLabel: 'Close',
				title: '删除敏感词',
				subText: word || '',
			}}
		>
			<DialogFooter>
				<ThemeButton
					onClick={() => {
						const list = sensitive_list$.value.filter(v => v !== word)
						sensitive_list$.next(list)
						will_delete$.next('')
					}}
				>
					好
				</ThemeButton>
				<DefaultButton
					onClick={() => {
						will_delete$.next('')
					}}
				>
					取消
				</DefaultButton>
			</DialogFooter>
		</Dialog>
	)
}
