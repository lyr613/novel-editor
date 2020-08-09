import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { next_router, ROUTERL2 } from '@/router'

/** Editor */
export default function Editor() {
    return (
        <div
            className={css(s.root)}
            onClick={() => {
                next_router('edit', ROUTERL2.edit.chapter_set)
            }}
        >
            主页
        </div>
    )
}
