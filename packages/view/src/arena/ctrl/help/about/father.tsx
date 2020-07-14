// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

/** 作者 */
export default function Father() {
    return (
        <section className={s.Father}>
            <SectionHeader>编辑器作者</SectionHeader>
            <div className={s.aline}>秋无衣</div>
            <div className={s.aline}>有意见建议请b站搜索我发私信</div>
            <div className={s.aline}>或我的邮箱 zrtxlyr@126.com (并不常看)</div>
        </section>
    )
}
