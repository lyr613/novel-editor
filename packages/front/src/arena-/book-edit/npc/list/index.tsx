import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { map, switchMap } from 'rxjs/operators'
import { screen$ } from 'subject-/screen'

const arr = Array.from({ length: 22 }, (_, i) => i)
const arr$ = new BehaviorSubject(arr)

/**
 */
export default function List() {
    const arr = useObservable(
        () =>
            arr$.pipe(
                switchMap((li) =>
                    screen$(300).pipe(
                        map((screen) => {
                            const WW = screen.W - 20
                            let n = 1
                            while (300 * n < WW) {
                                n++
                            }
                            const w = (WW / n) | 0
                            return li.map((it) => ({
                                item: it,
                                w: w,
                            }))
                        }),
                    ),
                ),
            ),
        [],
    )
    return (
        <div className={css(style.root)}>
            {arr.map((it, i) => (
                <Item key={i} w={it.w} />
            ))}
        </div>
    )
}

function Item(p: any) {
    return (
        <div
            className={css(style.Item)}
            style={{
                width: p.w + 'px',
            }}
        >
            <div
                style={{
                    backgroundColor: 'purple',
                    width: '100%',
                    height: '100%',
                }}
            ></div>
        </div>
    )
}
