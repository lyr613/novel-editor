// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'

export default function Hotkey() {
    return (
        <div className={s.Hotkey}>
            <SectionHeader>快捷键</SectionHeader>
            <div className={s.aline}>退出: 快速连续两次 alt/command + q</div>
            <div className={s.aline}>重载app: alt/command + r</div>
            <div className={s.aline}>切换全屏: alt/command + f</div>
            <SectionHeader>删除</SectionHeader>
            <div className={s.aline}>删除: 删除按钮双击才会生效</div>
        </div>
    )
}
