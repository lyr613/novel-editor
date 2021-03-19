import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'

/** LeftGroup */
export default function LeftGroup() {
    return (
        <div className={css(s.LeftGroup)}>
            <CubeBoxItem />
            <CubeBoxItem />
            <CubeBoxItem />
        </div>
    )
}

function CubeBoxItem() {
    return <div className={css(s.CubeBoxItem, StyleComp.select_item.item)}>名字</div>
}
