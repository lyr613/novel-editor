// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { fromEvent } from 'rxjs'

/**
 * 检测鼠标滚轮或触摸板双指, 让overflow: hidden的容器可以滚动
 * @param ref
 * @param wh 方向, w水平
 */
export default function useScroll(ref: React.MutableRefObject<HTMLElement | null>, wh: 'w' | 'h', ...watchers: any[]) {
	useEffect(() => {
		// 滚轮可以左右移动内容
		const dom = ref.current
		if (!dom) {
			return
		}
		const ob_sc = fromEvent(dom, 'mousewheel').subscribe(e => {
			const ea: any = e
			e.preventDefault()
			const dt = Math.abs(ea.wheelDeltaX) > Math.abs(ea.wheelDeltaY) ? ea.wheelDeltaX : ea.wheelDeltaY
			const w = dt
			const s = wh === 'w' ? dom.scrollLeft : dom.scrollTop
			if (wh === 'w') {
				dom.scrollTo(s - w, 0)
			} else {
				dom.scrollTo(0, s - w)
			}
		})
		return () => ob_sc.unsubscribe()
	}, [ref, wh, watchers])
	return null
}
