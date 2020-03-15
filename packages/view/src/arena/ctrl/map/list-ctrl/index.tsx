// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import IconButton from '@/component/icon-button'
import { of_map, map_list$, map_focu_id$ } from '../subj'

/** 左上角列表控制, 添加 删除 */
export default function ListCtrl() {
	return (
		<div className={s.ListCtrl}>
			<IconButton
				icon="Add"
				add_class={[s.btn]}
				onClick={() => {
					const nmap = of_map()
					const arr = map_list$.value
					nmap.name = `地图-${arr.length + 1}`
					map_list$.next([nmap, ...arr])
				}}
			/>
			<IconButton
				icon="Delete"
				add_class={[s.btn]}
				onDoubleClick={() => {
					const arr = map_list$.value
					const fid = map_focu_id$.value
					const narr = arr.filter(v => v.id !== fid)
					map_list$.next(narr)
				}}
			/>
		</div>
	)
}
