import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import SelList from './sel-list'
import Infor from './infor'

/**
 */
export default function Edit() {
    return (
        <div className={css(style.Edit)}>
            <SelList />
            <Infor />
        </div>
    )
}
