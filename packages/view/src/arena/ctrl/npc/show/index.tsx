// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import Bar from './bar'
import ListLike from './list'

export default function Show() {
    return (
        <div className={s.Show}>
            <Bar></Bar>
            <ListLike></ListLike>
        </div>
    )
}
