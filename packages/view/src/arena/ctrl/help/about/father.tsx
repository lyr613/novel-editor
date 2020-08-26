// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SectionHeader from '@/component/section-header'
import { style as s } from '../style'
import { css } from 'aphrodite/no-important'

/** 作者 */
export default function Father() {
    return (
        <section>
            <SectionHeader>编辑器作者</SectionHeader>
            <div className={css(s.aline)}>秋无衣</div>
            <div className={css(s.aline)}>有意见建议请b站搜索我发私信</div>
            <div className={css(s.aline)}>或我的邮箱 zrtxlyr@126.com (并不常看)</div>
        </section>
    )
}
