// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import SectionHeader from '@/component/section-header'
import { style as s } from '../style'
import { css } from 'aphrodite/no-important'
/** 待做 */
export default function Next() {
    return (
        <section>
            <SectionHeader>待做</SectionHeader>
            <div className={css(s.aline)}>角色储存图片</div>
            <div className={css(s.aline)}>地图元素右侧列表可编辑</div>
        </section>
    )
}
