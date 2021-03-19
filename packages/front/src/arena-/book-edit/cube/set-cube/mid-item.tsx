import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'

/** LeftGroup */
export default function MidItem() {
    return (
        <div className={css(s.MidItem)}>
            <CubeItemItem />
            <CubeItemItem />
            <CubeItemItem />
            <CubeItemItem />
            <CubeItemItem />
        </div>
    )
}

function CubeItemItem() {
    return (
        <div className={css(StyleComp.select_item.item, s.CubeItemItem)}>
            <div>名字</div>
            <div className={css(s.CubeItemRemark)}>
                描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述
            </div>
        </div>
    )
}
