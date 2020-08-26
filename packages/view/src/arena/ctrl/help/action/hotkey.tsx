// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SectionHeader from '@/component/section-header'
import { style as s } from '../style'
import { css } from 'aphrodite/no-important'

export default function Hotkey() {
    return (
        <section>
            <SectionHeader>快捷键</SectionHeader>
            <div className={css(s.aline)}>退出: 快速连续两次 alt/command + q</div>
            <div className={css(s.aline)}>重载app: alt/command + r</div>
            <div className={css(s.aline)}>切换全屏: alt/command + f</div>
            <SectionHeader>双击</SectionHeader>
            <div className={css(s.aline)}>危险的动作按钮双击才会生效, 如删除, 和一些关闭</div>
        </section>
    )
}
