// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import {
    map_list$,
    map_focu_id$,
    be_editing$,
    be_selecting$,
    map_txt_buffer$,
    amap,
    map_list_name_filter$,
} from '../subj'
import { switchMap, map } from 'rxjs/operators'

/** 地图列表 */
export default function ListShow() {
    const list = useObservable(
        () =>
            map_list$.pipe(
                switchMap((li) => map_list_name_filter$.pipe(map((fil) => li.filter((v) => v.name.match(fil))))),
            ),
        [],
    )
    const foid = useObservable(() => map_focu_id$, '')
    return (
        <div className={s.ListShow}>
            {list.map((amap) => (
                <div
                    key={amap.id}
                    onClick={() => {
                        if (be_selecting$.value) {
                            // 选择链接
                            const mtb = map_txt_buffer$.value
                            mtb.linkid = amap.id
                            map_txt_buffer$.next(mtb)
                            be_selecting$.next(false)
                        } else {
                            // 切换地图
                            if (be_editing$.value) {
                                const arr = map_list$.value
                                map_list$.next([...arr])
                                be_editing$.next(false)
                            }
                            map_focu_id$.next(amap.id)
                        }
                    }}
                    className={[s.one, foid === amap.id ? s.focu : ''].join(' ')}
                >
                    <OneCns mapp={amap} />
                    <div className={s.name}>{amap.name}</div>
                </div>
            ))}
        </div>
    )
}

interface p_cns {
    mapp: amap
}
function OneCns(p: p_cns) {
    const ref = useRef<null | HTMLCanvasElement>(null)
    const pens = p.mapp.pens
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const cns = dom.getContext('2d')!
        cns.clearRect(0, 0, 200, 200)
        pens.forEach((pen) => {
            const l = new Path2D()
            const pts = pen.points
            if (!pts.length) {
                return
            }
            cns.strokeStyle = pen.color
            l.moveTo(pts[0].x / 5, pts[0].y / 5)
            pts.forEach((pt) => {
                l.lineTo(pt.x / 5, pt.y / 5)
            })
            cns.stroke(l)
        })
    }, [pens])
    return <canvas ref={ref} className={s.cns} width="200" height="200"></canvas>
}
