// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react'
import ThemeLabel from '@/component/theme-label'
import { next_router } from '@/function/router'

const drop_opts: IDropdownOption[] = [
	{
		key: 'item',
		text: '物品',
	},
	{
		key: 'skill',
		text: '技能',
	},
]
export default function Show() {
	return (
		<div className={s.Show}>
			<div className={s.bar}>
				<Dropdown className={s.drop} options={drop_opts}></Dropdown>
				<ThemeLabel
					onClick={() => {
						next_router('table', 'edit')
					}}
				>
					类型管理
				</ThemeLabel>
			</div>
			<Table />
		</div>
	)
}

// 等级 \ 体系
const system = [
	{
		name: '灵石',
		id: 'qweqwe',
	},
	{
		name: '仙晶',
		id: 'asdad',
	},
]
const arr = [
	[999, '', '极品仙晶'],
	[998, '', '上品仙晶'],
	[997, '', '中品仙晶'],
	[996, '', '下品仙晶'],
	[4, '极品灵石', ''],
	[3, '上品灵石', ''],
	[2, '中品灵石', ''],
	[1, '下品灵石', ''],
]
function Table() {
	return (
		<div className={s.Table}>
			<div className={s.line}>
				<div className={s.td}>等级 \ 体系</div>
				{system.map(sy => (
					<div className={s.td} key={sy.id}>
						{sy.name}
					</div>
				))}
			</div>
			{arr.map((line, y) => (
				<div className={s.line} key={line[0]}>
					{line.map((txt, x) => (
						<div className={s.td} key={`${y}-${x}`}>
							{txt}
						</div>
					))}
				</div>
			))}
		</div>
	)
}
