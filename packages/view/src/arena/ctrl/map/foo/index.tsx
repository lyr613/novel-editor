// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Toggle, TextField, SearchBox } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { be_editing$, be_selecting$, be_drawing$, map_focu$, of_txt, map_txt_buffer$, map_list$ } from '../subj'
import ThemeLabel from '@/component/theme-label'
import { shallowCopy } from '@/rx/shallow-copy'

/** 工具设置 */
export default function Foo() {
	const be_editing = useObservable(() => be_editing$, false)
	const be_drawing = useObservable(() => be_drawing$, false)
	const txtm = useObservable(() => map_txt_buffer$.pipe(shallowCopy()))
	const maps = useObservable(() => map_list$, [])
	const link_map = maps.find(v => v.id === txtm?.linkid)
	if (!txtm) {
		return null
	}

	return be_editing ? (
		<div className={s.Foo}>
			<Toggle
				onText="绘制曲线"
				offText="添加链接"
				checked={be_drawing}
				onChange={(_, b) => {
					if (!b) {
						const fo = map_focu$.value
						if (!fo) {
							return
						}
						const nt = of_txt()
						map_txt_buffer$.next(nt)
					}
					be_drawing$.next(!!b)
				}}
				styles={{
					root: {
						margin: '0 10px',
					},
				}}
			></Toggle>
			{be_drawing ? null : (
				<>
					<TextField
						placeholder="链接显示文字"
						value={txtm.txt}
						onChange={(_, ns) => {
							ns = ns || ''
							const bf = map_txt_buffer$.value
							bf.txt = ns
							map_txt_buffer$.next(bf)
						}}
						underlined
						styles={{
							root: {
								margin: '0 10px',
								width: '120px',
							},
							fieldGroup: {
								backgroundColor: 'rgb(0,0,0,0)',
							},
						}}
					></TextField>
					<ThemeLabel
						onClick={() => {
							be_selecting$.next(!be_selecting$.value)
						}}
						add_class={['canclk', s.btn]}
						title="点击开始从左侧列表选择链接到的地图"
					>
						链接地图: {link_map?.name ?? '未选择'}
					</ThemeLabel>
					<ThemeLabel
						onClick={() => {
							const fo = map_focu$.value
							if (!fo) {
								return
							}
							fo.txts.push(map_txt_buffer$.value)
							map_focu$.next(fo)
							map_txt_buffer$.next(of_txt())
						}}
						add_class={['canclk', s.btn]}
					>
						好
					</ThemeLabel>
				</>
			)}
		</div>
	) : (
		<div className={s.EEE}></div>
	)
}
