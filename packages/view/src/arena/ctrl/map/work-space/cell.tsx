// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { map_focu$, pen_, map_txt, of_txt, map_list$ } from '../subj'
import IconButton from '@/component/icon-button'

/** 绘制组成 */
export default function DrawCellBox() {
	return (
		<div className={s.DrawCellBox}>
			<Pens />
			<Texts />
		</div>
	)
}

/** 曲线部分 */
function Pens() {
	const [can_show_list, set_can_show_list] = useState(true)
	const focu = useObservable(() => map_focu$.pipe(shallowCopy()))
	const list = focu?.pens ?? []
	return (
		<div className={s.Pens}>
			<div
				className={s.title}
				onClick={() => {
					set_can_show_list(!can_show_list)
				}}
			>
				曲线
			</div>
			{can_show_list ? list.map(it => <OnePen key={it.id} pen={it} />) : <HaveMore />}
		</div>
	)
}

interface p_histroy_one_draw {
	pen: pen_
}
/** 一条曲线 */
function OnePen(p: p_histroy_one_draw) {
	const ref_cns = useRef<null | HTMLCanvasElement>(null)
	const { pen } = p
	useEffect(() => {
		const dom = ref_cns.current
		if (!dom) {
			return
		}
		const pts = pen.points
		const cns = dom.getContext('2d')!
		cns.strokeStyle = pen.color
		const l = new Path2D()
		l.moveTo(pts[0].x / 10, pts[0].y / 10)
		pts.forEach(pt => {
			l.lineTo(pt.x / 10, pt.y / 10)
		})
		cns.stroke(l)
	}, [pen])
	return (
		<div className={s.one}>
			<canvas className={s.cns} ref={ref_cns} width="100" height="100"></canvas>
			<IconButton
				add_class={[s.iconbtn]}
				icon="Delete"
				onDoubleClick={() => {
					const fo = map_focu$.value
					if (!fo) {
						return
					}
					fo.pens = fo.pens.filter(v => v.id !== p.pen.id)
					map_focu$.next(fo)
				}}
			></IconButton>
		</div>
	)
}

/** 链接部分 */
function Texts() {
	const [can_show_list, set_can_show_list] = useState(true)
	const fo = useObservable(() => map_focu$.pipe(shallowCopy()))
	const list = fo?.txts ?? []

	return (
		<div className={s.Texts}>
			<div
				className={s.title}
				onClick={() => {
					set_can_show_list(!can_show_list)
				}}
			>
				链接
			</div>
			{can_show_list ? list.map(tt => <OneTxt key={tt.id} v={tt}></OneTxt>) : <HaveMore />}}
		</div>
	)
}

interface p_one_txt {
	v: map_txt
}
function OneTxt(p: p_one_txt) {
	const { v } = p
	const arr = map_list$.value
	const fi = arr.find(mp => mp.id === v.linkid)
	return (
		<div className={s.one}>
			<div className={s.name}>{v.txt}</div>
			<div className={s.link}>链接地图: {fi?.name}</div>
			<IconButton
				add_class={[s.iconbtn]}
				icon="Delete"
				onDoubleClick={() => {
					const fo = map_focu$.value
					if (!fo) {
						return
					}
					fo.txts = fo.txts.filter(t => t.id !== v.id)
					map_focu$.next(fo)
				}}
			></IconButton>
		</div>
	)
}

/** 展开更多 */
function HaveMore() {
	return <div className={s.havemore}>~~~</div>
}
