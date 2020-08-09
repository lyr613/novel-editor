import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

/** ChapterSet */
export default function ChapterSet() {
    return <div className={css(s.root)}>设置章节</div>
}
