import React, { useState, useEffect, useRef } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { BookEditNpc } from '../subj'
import MainList from './main-list'
import MenuBar from './menu-bar'
import ChapterSlider from 'component-/chapter-slider'

/**
 */
export default function List() {
    return (
        <div className={css(style.List)}>
            <ChapterSlider />
            <MenuBar />
            <MainList />
        </div>
    )
}
