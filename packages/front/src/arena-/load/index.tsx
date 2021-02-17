import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'

/**
 * #### 进入时加载
 * - 列表页
 * - 编辑页
 */
export default function FirstLoad() {
    return (
        <div className={css(style.root)}>
            <LoadList />
        </div>
    )
}

function LoadList() {
    return (
        <div
            style={{
                padding: 10,
            }}
        >
            <div className={css(style.line)}>加载页面</div>
            <div className={css(style.line)}>加载页面</div>
            <div className={css(style.line)}>加载页面</div>
            <div className={css(style.line)}>加载页面</div>
        </div>
    )
}
