import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import SelList from './sel-list'
import Infor from './infor'
import Imgs from './imgs'

/**
 */
export default function Edit() {
    return (
        <div className={css(style.Edit)}>
            <SelList />
            <Infor />
            <Imgs />
        </div>
    )
}
