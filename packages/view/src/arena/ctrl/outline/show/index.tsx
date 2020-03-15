// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import {
	book_focu$,
	chapter_list$,
	npc_find$,
	npc_map$,
	chapter_map$,
	incident_map$,
	incident_find$,
    find_chapter_list_auto,
} from '@/source'
import { next_router } from '@/function/router'
import { useObservable } from 'rxjs-hooks'
import { outline_find$, outline_focu$, outline_map$, of_outline } from '@/source'
import { Icon, Label, ActionButton } from 'office-ui-fabric-react'

/**
 * 大纲
 */
export default function Show() {
	const chapters = useObservable(() => chapter_list$, [])
	const outline_map = useObservable(() => outline_map$)
	const npc_map = useObservable(() => npc_map$)
	const chapter_map = useObservable(() => chapter_map$)
	const incident_map = useObservable(() => incident_map$)
	useEffect(() => {
		npc_find$.next()
        incident_find$.next()
        find_chapter_list_auto()
		outline_find$.next()
	}, [])
	if (!book_focu$.value?.src) {
		next_router('shelf')
		return null
	}
	if (!chapter_map || !incident_map || !npc_map || !outline_map) {
		return null
	}
	const otids = ['all', ...chapters.map(v => v.id)]
	const outline_list = otids.map(id => {
		if (outline_map[id]) {
			return outline_map[id]
		}
		return of_outline({ id })
	})
	return (
		<div className={s.Outline}>
			{outline_list.map(outline => (
				<div className={s.one} key={outline.id}>
					<div
						className={s.title}
						onClick={() => {
							outline_focu$.next(outline)
							next_router('outline', 'edit')
						}}
					>
						<span>{chapter_map.get(outline.id)?.name ?? '总纲'}</span>
						<Icon className={s.toedit} iconName="Settings"></Icon>
					</div>
					<div className={s.text}>{map_text(outline.text)}</div>
					<div className={s.line}></div>
					<div className={s.incident}>
						<span
							style={{
								whiteSpace: 'nowrap',
							}}
						>
							相关事件:
						</span>
						<div>
							{outline.incident_ids
								.map(id => incident_map.get(id)!)
								.filter(v => !!v)
								.map(incident => (
									<Label key={incident.id} className={s.namelabel}>
										{incident.label}
									</Label>
								))}
						</div>
					</div>
					<div className={s.line}></div>
					<div className={s.npc}>
						<span
							style={{
								whiteSpace: 'nowrap',
							}}
						>
							相关角色:
						</span>
						<div className={s.npcbox}>
							<Npcs incident_ids={outline.incident_ids} incident_map={incident_map} npc_map={npc_map} />
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
interface p_npc {
	incident_ids: string[]
	incident_map: Map<string, incident>
	npc_map: Map<string, npc>
}
/** 相关npc */
function Npcs(p: p_npc) {
	const incis = p.incident_ids.map(id => p.incident_map.get(id)!).filter(v => !!v)
	const npcids = new Set<string>()
	for (const inci of incis) {
		for (const npcid of inci.npc_ids) {
			npcids.add(npcid)
		}
	}
	const nids = Array.from(npcids)
	const npcs = nids.map(id => p.npc_map.get(id)!).filter(v => !!v)
	return (
		<>
			{npcs.map(npc => (
				<Label key={npc.id} className={s.namelabel}>
					{npc.base.name}
				</Label>
			))}
		</>
	)
}

/** 转化文本以便查看 */
function map_text(old: string) {
	return old
		.replace(/\n+/g, '\n')
		.split('\n')
		.map(s => s.replace(/^\s*/, '    '))
		.join('\n\n')
}
