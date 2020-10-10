import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

/** Link */
export default function Link() {
    return <div className={css(s.root)}>关系图设置</div>
}
