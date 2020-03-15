import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { next_router, routers } from '@/function/router'
import { useObservable } from 'rxjs-hooks'
import { book_focu$ } from '@/source'
import { useLocation } from 'react-router-dom'

export function Menu() {
	const book = useObservable(() => book_focu$)

	return (
		<div className={s.Menu}>
			<div className={s.switch}></div>

			<ul className={s.list}>
				<li
					className={s.line}
					style={{
						marginTop: 0,
					}}
				/>
				<Item path="shelf">{routers.shelf}</Item>
				{/* <Item path="chapter" disable={!book}>
					{routers.chapter}
				</Item> */}
				<Item path="edit" disable={!book}>
					{routers.edit}
				</Item>
				<li className={s.line} />
				<Item path="search" disable={!book}>
					搜索
				</Item>
				<Item path="outline" disable={!book}>
					{routers.outline}
				</Item>
				<Item path="incident" disable={!book}>
					{routers.incident}
				</Item>
				<Item path="npc" disable={!book}>
					角色
				</Item>
				<Item path="table" disable={!book}>
					表格
				</Item>
				<Item path="map" disable={!book}>
					地图
				</Item>
				<Item path="git" disable={!book}>
					仓库
				</Item>
				<li className={s.line} />
				<Item path="option">设置</Item>
				<Item path="zip">归档</Item>
				<Item path="help">{routers.help}</Item>
				{/* <Item path="setting">设置</Item> */}
			</ul>
		</div>
	)
}

interface item {
	children: string
	disable?: boolean
	path: routers
}
function Item(p: item) {
	const { pathname } = useLocation()
	const now_path = pathname.split(/[\\/]/)[1]
	return (
		<li
			className={[s.item, p.disable ? s.disable : s.able, now_path === p.path ? s.highlight : ''].join(' ')}
			onClick={() => {
				if (p.disable) {
					return
				}
				next_router(p.path)
			}}
		>
			{p.children}
		</li>
	)
}
