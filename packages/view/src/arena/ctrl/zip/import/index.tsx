// eslint-disable-next-line
import React, { useState, useEffect, useReducer } from 'react'
import s from './s.module.scss'
import Txt from './txt'
import Git from './git'

export default function Import() {
    return (
        <div className={s.Import}>
            <Txt />
            <Git />
        </div>
    )
}
