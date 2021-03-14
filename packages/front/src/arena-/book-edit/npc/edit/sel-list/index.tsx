import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'

/**
 */
export default function SelList() {
    return (
        <div className={css(style.SelList)}>
            <Item />
            <Item />
            <Item />
        </div>
    )
}

function Item() {
    return <div className={css(style.Item)}>名字</div>
}
