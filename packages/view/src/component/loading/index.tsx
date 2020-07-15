// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { global_loading$ } from './subj'
import { Icon } from 'office-ui-fabric-react'

interface p {
    loading?: boolean
    children?: JSX.Element | string | number
}
/** 加载遮罩 */
export default function Loading(p: p) {
    const globaling = useObservable(() => global_loading$)
    return globaling || p.loading ? (
        <div className={s.Loading}>
            {p.children}
            {!p.children && <Icon className={s.icon} iconName="SyncOccurence"></Icon>}
        </div>
    ) : null
}
