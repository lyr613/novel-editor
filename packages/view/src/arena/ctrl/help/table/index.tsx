// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { style as s } from '../style'
import { css } from 'aphrodite/no-important'
import SectionHeader from '@/component/section-header'

export default function Table() {
    return (
        <section>
            <SectionHeader>表格</SectionHeader>
            <div className={css(s.aline)}>在表格双击其中一项, 会跳到搜索页自动搜索</div>
        </section>
    )
}
