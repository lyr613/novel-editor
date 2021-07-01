import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import LeftGroup from './left-group'
import MidItem from './mid-item'
import RightOption from './right-option'

/**
 */
export default function SetCube() {
    return (
        <div className={css(style.SetCube)}>
            <LeftGroup />
            <MidItem />
            <RightOption />
        </div>
    )
}
