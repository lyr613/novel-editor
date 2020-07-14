// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

export default function Incident() {
    return (
        <section className={s.Incident}>
            <SectionHeader>事件</SectionHeader>
            <div className={s.aline}>
                节奏线: 顶部的节奏线, 根据线索设置的开始结束章节字数绘制成. 单击方块可以选中对应事件,
                双击可以使对应事件进入可视区域
            </div>
        </section>
    )
}
