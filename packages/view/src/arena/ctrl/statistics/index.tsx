import React, { useState, useEffect, useRef } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { get_cur_book_src } from '@/source/book'
import { next_router } from '@/function/router'
import echarts from 'echarts'

/** 统计 */
export default function Statistics() {
    // if (!get_cur_book_src()) {
    //     next_router('shelf')
    //     return null
    // }
    return (
        <div className={css(s.root)}>
            <Options />
            <ChartCount />
        </div>
    )
}

function Options() {
    return <div className={css(s.Options)}>{}</div>
}

function ChartCount() {
    const ref = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const ct = echarts.init(dom)
        ct.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                },
            ],
        })
        return () => {
            ct.dispose()
        }
    }, [])
    return (
        <div className={css(s.ChartCount)} ref={ref}>
            {}
        </div>
    )
}
