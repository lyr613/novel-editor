// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { fromEvent } from 'rxjs'
import { map, concatMap, takeUntil } from 'rxjs/operators'

const tran_hash = {
	left: 'translateX(-50%)',
	right: 'translateX(50%)',
	top: 'translateY(-50%)',
	bottom: 'translateY(50%)',
}

interface p {
	/** 基准方向 */
	datum: 'left' | 'top' | 'right' | 'bottom'
	/** 水平 | 竖直线 */
	direction?: 'level' | 'erect'
	on_drag: (n: number) => void
	min?: number
	max?: number
	style?: React.CSSProperties
}

export default function DragLine(p: p) {
	const ref = useRef<null | HTMLDivElement>(null)
	const { on_drag, min, max, datum } = p
	const direction = ['top', 'bottom'].includes(p.datum) ? 'level' : 'erect'

	useEffect(() => {
		const dom = ref.current
		if (!dom || !on_drag) {
			return
		}
		const gxy = direction === 'erect' ? gx : gy
		const start$ = fromEvent(dom, 'mousedown')
		const move$ = fromEvent(document, 'mousemove')
		const end$ = fromEvent(document, 'mouseup')
		const ob = start$
			.pipe(
				map(e => {
					e.preventDefault()
					const flag = ['right', 'bottom'].includes(datum) ? -1 : 1
					return gxy(e) * flag - Number(dom.style[datum].replace('px', ''))
				}),
				concatMap(x0 => {
					return move$.pipe(
						takeUntil(end$),
						map(e => {
							const flag = ['right', 'bottom'].includes(datum) ? -1 : 1
							return gxy(e) * flag - x0
						}),
					)
				}),
			)
			.subscribe(n => {
				if (min && min > n) {
					return
				}
				if (max && max < n) {
					return
				}
				on_drag(n)
			})
		return () => {
			ob.unsubscribe()
		}
	}, [on_drag, min, max, direction, datum])
	return (
		<div
			className={[s.DragLine, direction === 'erect' ? s.erect : s.level].join(' ')}
			ref={ref}
			style={{
				transform: tran_hash[p.datum],
				...p.style,
			}}
			draggable={false}
		></div>
	)
}

function gx(e: any) {
	return (e as any).screenX
}

function gy(e: any) {
	return (e as any).screenY
}
