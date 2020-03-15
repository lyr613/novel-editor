// eslint-disable-next-line
import React, { useState, useEffect, useReducer } from 'react'
import s from './s.module.scss'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { fs_read, select_dir, select_file } from '@/source'
import ThemeLabel from '@/component/theme-label'
import ThemeButton from '@/component/theme-button'
import { ipc } from '@/const'
import { editer_setting$ } from '@/subject'

export default function Import() {
	const [txt_src, set_txt_src] = useState('')
	const [dir_src, set_dir_src] = useState('')
	const [reg, set_reg] = useState('')
	return (
		<div className={s.Import}>
			<div className={s.section}>导入文本</div>
			<div className={s.line}>
				<ThemeLabel>选择txt文件,字符编码utf-8: {txt_src}</ThemeLabel>
				<DefaultButton
					onClick={async () => {
						const re = await select_file()
						set_txt_src(re)
					}}
				>
					选择要导入的文本
				</DefaultButton>
			</div>
			<div className={s.line}>
				<ThemeLabel>选择一个空文件夹: {dir_src}</ThemeLabel>
				<DefaultButton
					onClick={async () => {
						const re = await select_dir()
						if (!re.empty) {
							alert('选择一个空文件夹')
							return
						}
						set_dir_src(re.src)
					}}
				>
					选择存放位置
				</DefaultButton>
			</div>
			<div className={s.line}>
				<ThemeLabel>章节分割正则, 如果不填写, 则使用: ^\s*第.+章\s</ThemeLabel>
				<TextField
					className={s.input}
					value={reg}
					onChange={(_, ss) => {
						const ns = ss || ''
						set_reg(ns)
					}}
				></TextField>
			</div>

			<ThemeButton
				disabled={!dir_src || !txt_src}
				onClick={() => {
					ipc().send('import_txt', txt_src, dir_src, reg)
				}}
			>
				开始导入
			</ThemeButton>
			<Step />
		</div>
	)
}

/** 解析步骤 */
function Step() {
	const [arr, set_arr] = useReducer<(arr: string[], nw: string) => string[]>((arr, nw) => [...arr, nw], [])
	useEffect(() => {
		const lin = (_: any, str: string) => {
			set_arr(str)
			if (str.match(/^end:/)) {
				str = str.replace(/^end:/, '')
				const p = editer_setting$.value
				p.shelf.book_list.unshift(str)
				editer_setting$.next(p)
			}
		}

		ipc().on('import_txt_step', lin)
		return () => {
			ipc().removeListener('import_txt_step', lin)
		}
	}, [])
	return (
		<div className={s.Step}>
			{arr.map((st, i) => (
				<ThemeLabel key={i}>{st}</ThemeLabel>
			))}
		</div>
	)
}
