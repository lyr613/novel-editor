import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { _npc } from '../subj'
import MainList from './main-list'
import MenuBar from './menu-bar'

/**
 */
export default function List() {
    return (
        <div className={css(style.List)}>
            <MenuBar />
            <MainList />
        </div>
    )
}
