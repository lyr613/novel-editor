// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

/** 待做 */
export default function Next() {
    return (
        <div className={s.Next}>
            <SectionHeader>即将到来</SectionHeader>
            <div className={s.aline}>角色储存图片</div>
            <div className={s.aline}>单独的角色关系设置页面</div>
        </div>
    )
}
