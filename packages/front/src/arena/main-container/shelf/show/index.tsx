import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style/global'
import { style as s } from './style'

/** Show */
export default function Show() {
    return <div className={css(s.Show)}>查看</div>
}
