import React from 'react'
import { IColumn, DefaultButton, ActionButton } from 'office-ui-fabric-react'
import { npc_list$, npc_focu$, book_focu$, npc_find$ } from '@/source'
import { next_router } from '@/function/router'
import { ReplaySubject } from 'rxjs'
import { gender_decode } from '@/util'
import { electron } from '@/const'
const ipc = electron().ipcRenderer

export interface npc_show {
	id: string
	name: string
	active_start: string
	active_end: string
}

export const columns$ = new ReplaySubject<IColumn[]>(1)
export const columns: IColumn[] = [
	{
		key: 'name',
		name: '姓名',
		fieldName: 'name',
		minWidth: 60,
		maxWidth: 140,
		isResizable: true,
	},
	{
		key: 'active_start',
		name: '登场',
		fieldName: 'active_start',
		minWidth: 60,
		maxWidth: 140,
		isResizable: true,
		iconName: 'Sort',
		onColumnClick(_, column) {
			switch (column.iconName) {
				case 'Up':
					column.iconName = 'Down'
					break
				case 'Down':
					column.iconName = 'Sort'
					break
				default:
					column.iconName = 'Up'
					break
			}
			columns.splice(1, 1, column)
			columns$.next(columns)
		},
	},
	{
		key: 'active_end',
		name: '退场',
		fieldName: 'active_end',
		minWidth: 60,
		maxWidth: 140,
		isResizable: true,
	},
	{
		key: 'action',
		name: '操作',
		fieldName: 'action',
		minWidth: 60,
		maxWidth: 200,
		isResizable: false,
	},
]
columns$.next(columns)
export function how_render(item: npc_show, index?: number, column?: IColumn) {
	if (!item || index === undefined || !column) {
		return <span></span>
	}
	const value = item[column.fieldName as keyof npc_show]

	switch (column.key) {
		case 'action':
			return (
				<>
					<ActionButton
						onClick={() => {
							const list = npc_list$.value
							const npc = list.find(v => v.id === item.id) || null
							npc_focu$.next(npc)
							next_router('npc', 'edit')
						}}
					>
						修改
					</ActionButton>
					<ActionButton
						onClick={() => {
							const list = npc_list$.value
							const npc = list.find(v => v.id === item.id) || null
							if (npc) {
								const re = ipc.sendSync('npc-del', book_focu$.value?.src, npc, true)
								if (re === true) {
									npc_find$.next()
								}
							}
						}}
					>
						删除
					</ActionButton>
				</>
			)
		default:
			return (
				<span
					style={{
						lineHeight: '42px',
					}}
				>
					{value}
				</span>
			)
	}
}

export function map_npc(npc: npc): npc_show {
	const b = npc.base
	const o: any = { ...b }
	o.gender = gender_decode(b.gender)
	o.active_start = `${b.active[0]}年${b.active[1]}月${b.active[2]}日`
	o.active_end = `${b.active[3]}年${b.active[4]}月${b.active[5]}日`
	o.id = npc.id
	return o
}
