// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Subject, BehaviorSubject, of, ReplaySubject } from 'rxjs'
import { switchMap } from 'rxjs/operators'

interface p<T> {
    rows: {
        label?: string
        ctrl: JSX.Element
    }[]
    styles?: {
        root?: React.CSSProperties
        row?: React.CSSProperties
        label?: React.CSSProperties
        ctrl?: React.CSSProperties
    }
    value_ob$?: Subject<T> | BehaviorSubject<T>
}

export const form_check$ = new Subject()
export const form_check_result$ = new Subject()

form_check$.subscribe()

export default function Form<T>(p: p<T>) {
    return (
        <div className={s.Form} style={p.styles?.root}>
            {p.rows.map((row, i) => (
                <div className={s.row} key={(row.label || '') + '-' + i} style={p.styles?.row}>
                    {row.label !== undefined && (
                        <div className={s.label} style={p.styles?.label}>
                            {row.label}
                        </div>
                    )}
                    <div className={s.ctrl} style={p.styles?.ctrl}>
                        {row.ctrl}
                    </div>
                </div>
            ))}
        </div>
    )
}

/**
 * 检查表单
 * @param c1
 * @param checks
 */
export function form_check<T, K>(c1: [T, (v: T) => boolean], ...checks: [K, (s: K) => boolean][]): Promise<boolean>
export function form_check<T, K>(
    c1: [T, (v: T) => boolean],
    c2: [K, (v: K) => boolean],
    ...checks: [any, (s: any) => boolean][]
): Promise<boolean>
export async function form_check<T>(...checks: [T, (s: T) => boolean][]): Promise<boolean> {
    const bs = await Promise.all(checks.map((v) => v[1](v[0])))
    return bs.every((b) => !!b)
}
