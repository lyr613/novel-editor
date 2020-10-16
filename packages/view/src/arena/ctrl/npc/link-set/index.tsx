import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import Table from './table'
import Edit from './edit'
import { find_npc_li_auto } from '@/source/npc'

/** 角色关系设置 */
export default function LinkSet() {
    useEffect(() => {
        find_npc_li_auto()
    }, [])
    return (
        <div className={css(s.root)}>
            <Table />
            <div className={css(sc.wh(1, '100%'), sc.bgclrl(3))}></div>
            <Edit />
        </div>
    )
}
