import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from '../style'
import SectionHeader from '@/component/section-header'

/** 小心 */
export default function Becareful() {
    return (
        <section className={css(s.root)}>
            <SectionHeader>注意</SectionHeader>
            <div className={css(s.aline)}>当前版本为0.x.y, 不稳定版本, 请勿正式使用</div>
        </section>
    )
}
