// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

export default function Table() {
    return (
        <section className={s.Table}>
            <SectionHeader>表格</SectionHeader>
            <div className={s.aline}>在表格双击其中一项, 会跳到搜索页自动搜索</div>
        </section>
    )
}
