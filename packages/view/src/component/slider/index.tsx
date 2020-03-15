// eslint-disable-next-line
import React, { useState, useEffect, useRef, useReducer } from 'react'
import s from './s.module.scss'
import { Label } from 'office-ui-fabric-react'
import { fromEvent, Subscription, Observable } from 'rxjs'
import { merge, map, concatMap, takeUntil, throttleTime } from 'rxjs/operators'

interface p {
	label: string
	value: number[]
	min: number
	max: number
	onChanged?: (e: MouseEvent, n2: [number, number]) => void
	onChange?: (n2: [number, number]) => void
	valueFormat1?: (n: number) => string
	valueFormat2?: (n: number) => string
	styles?: {
		root?: React.CSSProperties
		label_miner?: React.CSSProperties
		label_maxer?: React.CSSProperties
	}
}

/** 有两个焦点的滑动进度 */
export default class Slider2 extends React.Component {
	state = {
		...this.props,
		ref_box: null as HTMLDivElement | null,
		ref1: null as HTMLElement | null,
		ref2: null as HTMLElement | null,
	}
	props!: p
	obs: { [k: string]: null | Subscription } = {
		/** 拖动较小值 */
		drag1$: null,
		/** 拖动较大值 */
		drag2$: null,
		/** on change */
		change$: null,
		/** on changed */
		changed$: null,
	}
	/** 暂存两个值 */
	value_save = [0, 0]
	constructor(p: p) {
		super(p)
		this.value_save = this.state.value
		this.state.valueFormat1 = this.state.valueFormat1 || ((n: number) => String(n))
		this.state.valueFormat2 = this.state.valueFormat2 || ((n: number) => String(n))
	}
	componentDidMount() {
		const { state } = this
		const p = this.props
		const dom1 = state.ref1
		const dom2 = state.ref2
		const dombox = state.ref_box
		if (!dombox || !dom1 || !dom2) {
			return
		}
		const start1$ = fromEvent(dom1, 'mousedown').pipe(map(get_x))
		const start2$ = fromEvent(dom2, 'mousedown').pipe(map(get_x))
		const move$ = fromEvent(document, 'mousemove').pipe(map(get_x))
		const stop$ = fromEvent(document, 'mouseup').pipe()

		const ccm = concatMap((per0_x0: number[]) => {
			const [per0, x0] = per0_x0
			return move$.pipe(
				takeUntil(stop$),
				map(x1 => {
					const dx = x1 - x0
					const dper = (dx * 100) / dombox.clientWidth
					return per0 + dper
				}),
				map(per => {
					return ((p.max - p.min) * per) / 100 + p.min
				}),
				map(n => {
					return Math.min(p.max, Math.max(p.min, n)) | 0
				}),
			)
		})
		this.obs.drag1$ = start1$
			.pipe(
				map(x0 => {
					const per0 = Number(dom1.style.left.replace('%', ''))
					return [per0, x0]
				}),
				ccm,
			)
			.subscribe(n => {
				this.value_save[0] = n
				this.value_save = minmax(this.value_save)
				this.setState({
					value: this.value_save,
				})
			})
		this.obs.drag2$ = start2$
			.pipe(
				map(x0 => {
					const per0 = Number(dom2.style.left.replace('%', ''))
					return [per0, x0]
				}),
				ccm,
			)
			.subscribe(n => {
				this.value_save[1] = n
				this.value_save = minmax(this.value_save)
				this.setState({
					value: this.value_save,
				})
			})
		if (this.props.onChanged) {
			this.obs.changed$ = start1$
				.pipe(
					merge(start2$),
					concatMap(() => stop$),
				)
				.subscribe(e => {
					this.props.onChanged!(e as MouseEvent, minmax(this.value_save))
				})
		}
		if (this.props.onChange) {
			this.obs.change$ = start1$
				.pipe(
					merge(start2$),
					concatMap(() => move$.pipe(takeUntil(stop$))),
					throttleTime(100),
				)
				.subscribe(() => {
					this.props.onChange!(minmax(this.value_save))
				})
		}
	}
	componentWillUnmount() {
		const obs$ = Object.values(this.obs)
		obs$.forEach(ob$ => {
			if (ob$) {
				ob$.unsubscribe()
			}
		})
	}
	render() {
		const { state } = this
		const pos3 = get_posi(state.value[0], state.value[1], state.min, state.max)
		return (
			<div className={s.Slider} style={state.styles?.root}>
				{state.label && <Label>{state.label}</Label>}
				<div className={s['soft-slider-container']}>
					{/* 左侧值展示 */}
					<Label style={{ marginRight: '8px', ...(state.styles?.label_miner || {}) }}>
						{state.valueFormat1!(state.value[0])}
					</Label>
					<div className={s['soft-slider-sliderbox']} ref={dom => (state.ref_box = dom)}>
						<div className={s['soft-slider-line']}>
							{/* 3个span是横线, 2个i是小球 */}
							<span className={s['soft-slider-unactive']} style={{ width: `${pos3[0]}%` }}></span>
							<i
								className={s['soft-slider-thumb']}
								ref={dom => (state.ref1 = dom)}
								style={{ left: `${pos3[0]}%` }}
							></i>
							<span className={s['soft-slider-active']} style={{ width: `${pos3[1]}%` }}></span>
							<i
								className={s['soft-slider-thumb']}
								ref={dom => (state.ref2 = dom)}
								style={{ left: `${pos3[3]}%` }}
							></i>
							<span className={s['soft-slider-unactive']} style={{ width: `${pos3[2]}%` }}></span>
						</div>
					</div>
					{/* 右侧值展示 */}
					<Label style={{ marginLeft: '8px', ...(state.styles?.label_maxer || {}) }}>
						{state.valueFormat1!(state.value[1])}
					</Label>
				</div>
			</div>
		)
	}
}

function minmax(n2: number[]): [number, number] {
	if (n2[0] < n2[1]) {
		return [n2[0], n2[1]]
	}
	return [n2[1], n2[0]]
}

function get_posi(n1: number, n2: number, min: number, max: number) {
	if (n1 > n2) {
		;[n1, n2] = [n2, n1]
	}
	const len = Math.max(1, max - min)
	const l1 = Math.max(0, (n1 - min) / len) * 100
	const l2 = Math.max(0, (n2 - n1) / len) * 100
	const t2 = Math.max(0, (n2 - min) / len) * 100
	const l3 = Math.max(0, 100 - l2 - l1)
	return [l1, l2, l3, t2]
}

function get_x(e: MouseEvent | any) {
	return e.screenX
}
