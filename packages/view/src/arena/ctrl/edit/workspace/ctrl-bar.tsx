// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { editer_setting$ } from '@/subject'
import useScroll from '@/hook/scroll-hock'
import { Slider } from 'office-ui-fabric-react'
import ThemeLabel from '@/component/theme-label'
import { zen$ } from './subj'
import { sensitive_can_check$ } from '@/subject/sensitive'
import { monaco_option$ } from '@/subject/monaco'

/** 控制栏 */
export default function CtrlBar() {
    const ref = useRef<null | HTMLDivElement>(null)
    useScroll(ref, 'w')

    return (
        <div className={s.CtrlBar} ref={ref} title="鼠标滚轮或双指滑动">
            <Len />
            <Model />
        </div>
    )
}

/** 配置栏 */
function Len() {
    const ESet = useObservable(() => editer_setting$.pipe(shallowCopy()))
    /** 横向最大偏移量 */
    const max_tran = window.innerWidth / 3

    if (!ESet) {
        return null
    }
    /** 编辑窗口宽高 */
    const layout = ESet.editer.editer_layout
    /** 编辑窗口偏移 */
    const transform = ESet.editer.editer_transform
    return (
        <div className={s.Lenbar}>
            <span
                style={{
                    padding: '0 10px',
                    fontSize: '14px',
                }}
            >
                编辑窗口设置:{' '}
            </span>
            <span
                className={s.label}
                onClick={() => {
                    layout.width = 100
                    editer_setting$.next(ESet)
                }}
            >
                宽度
            </span>

            <Slider
                className={s.slider}
                min={20}
                max={100}
                value={layout.width}
                onChanged={(_, n) => {
                    layout.width = n
                    editer_setting$.next(ESet)
                }}
                onChange={(n) => {
                    layout.width = n
                    editer_setting$.next(ESet)
                }}
            ></Slider>
            <span
                className={s.label}
                onClick={() => {
                    layout.height = 100
                    editer_setting$.next(ESet)
                }}
            >
                高度
            </span>
            <Slider
                className={s.slider}
                min={20}
                max={100}
                value={layout.height}
                onChanged={(_, n) => {
                    layout.height = n
                    editer_setting$.next(ESet)
                }}
                onChange={(n) => {
                    layout.height = n
                    editer_setting$.next(ESet)
                }}
            ></Slider>
            <span
                className={s.label}
                onClick={() => {
                    transform.width = 0
                    editer_setting$.next(ESet)
                }}
            >
                水平偏移
            </span>
            <Slider
                className={s.slider}
                min={-max_tran}
                max={max_tran}
                value={transform.width}
                onChange={(n) => {
                    transform.width = n
                    editer_setting$.next(ESet)
                }}
            ></Slider>
            <span
                className={s.label}
                onClick={() => {
                    transform.height = 0
                    editer_setting$.next(ESet)
                }}
            >
                竖直偏移
            </span>
            <Slider
                className={s.slider}
                min={-200}
                max={200}
                value={transform.height}
                onChange={(n) => {
                    transform.height = n
                    editer_setting$.next(ESet)
                }}
            ></Slider>

            {/* <span className={s.label}>字体大小</span>
			<Slider className={s.slider}></Slider> */}
        </div>
    )
}

/** 模式调整 */
function Model() {
    const zen = useObservable(() => zen$)
    const sensitive_can_check = useObservable(() => sensitive_can_check$)
    const opt = useObservable(() => monaco_option$.pipe(shallowCopy()))
    return (
        <div className={s.Model}>
            <ThemeLabel
                add_class={[s.zen]}
                onClick={() => {
                    zen$.next(!zen$.value)
                }}
                styles={{
                    root: {
                        opacity: zen ? 1 : 0.6,
                    },
                }}
            >
                禅
            </ThemeLabel>
            <ThemeLabel
                add_class={[s.zen]}
                onClick={() => {
                    sensitive_can_check$.next(!sensitive_can_check$.value)
                }}
                styles={{
                    root: {
                        opacity: sensitive_can_check ? 1 : 0.6,
                    },
                }}
            >
                敏感词
            </ThemeLabel>
            <ThemeLabel
                add_class={[s.zen]}
                onClick={() => {
                    const opt = monaco_option$.value
                    opt.minimap!.enabled = !opt.minimap?.enabled
                    monaco_option$.next(opt)
                }}
                styles={{
                    root: {
                        opacity: opt?.minimap?.enabled ? 1 : 0.6,
                    },
                }}
            >
                缩略图
            </ThemeLabel>
        </div>
    )
}
