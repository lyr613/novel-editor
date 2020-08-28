// eslint-disable-next-line
import React, { useState, useEffect, useRef } from 'react'
import s from './s.module.scss'
import G6 from '@antv/g6'
import { next_router } from '@/router/router'
import { switchMap, map } from 'rxjs/operators'
import { npc_use_id$, npc_li$, npc_use$, mk_npc_map } from '@/source/npc'
import QvButton from '@/component/ui/button'

/** 关系图 */
export default function LinkGraph() {
    const ref = useRef<null | HTMLDivElement>(null)
    useEffect(() => {
        // 默认一个, 以后在此页加上列表选择
        if (!npc_use_id$.value) {
            const li = npc_li$.value
            npc_use_id$.next(li[0]?.id ?? '')
        }
    }, [])
    useEffect(() => {
        const dom = ref.current
        if (!dom) {
            return
        }
        const graph = new G6.Graph({
            container: dom,
            width: dom.clientWidth,
            height: dom.clientHeight,
            linkCenter: true,
            modes: {
                default: ['drag-canvas', 'zoom-canvas'],
            },
            layout: {
                type: 'radial',
                preventOverlap: true,
                strictRadial: true,
                nodeSize: 120,
                nodeSpacing: 120,
            },
            defaultNode: {
                type: 'circle',
                size: 60,
                color: '#5B8FF9',
                style: {
                    fill: '#9EC9FF',
                    lineWidth: 1,
                },
                labelCfg: {
                    style: {
                        fill: '#fff',
                        fontSize: 15,
                    },
                },
            },
            defaultEdge: {
                style: {
                    stroke: '#e2e2e2',
                },
                size: [3],
                labelCfg: {
                    style: {
                        fill: '#000',
                        fontSize: 15,
                    },
                },
            },
        })
        const ob = npc_li$
            .pipe(
                switchMap((li) =>
                    npc_use$.pipe(
                        map((use) => ({
                            li,
                            use,
                        })),
                    ),
                ),
            )
            .subscribe((p) => {
                graph.data(_get_edges(p.li, p.use))
                // if (p.use) {
                //     graph.focusItem(graph.findById(p.use.id))
                // }
                graph.render()
                graph.fitView()
            })
        graph.on('node:click', (e: any) => {
            const id = e?.item?.defaultCfg?.id
            if (id) {
                npc_use_id$.next(id)
            }
        })
        return () => {
            ob.unsubscribe()
            graph.destroy()
        }
    }, [])
    return (
        <div className={s.LinkGraph}>
            <div className={s.bar}>
                <QvButton
                    withTheme
                    onClick={() => {
                        next_router('npc')
                    }}
                >
                    返回
                </QvButton>
            </div>
            <div className={s.graph} ref={ref}></div>
        </div>
    )
}

function _get_edges(li: npc[], center?: npc) {
    const re: any = { nodes: [], edges: [] }
    if (!center) {
        return re
    }
    const m = mk_npc_map(li)
    const did_use = new Map<string, boolean>()
    re.nodes.push({
        id: center.id,
        label: center.base.name,
    })
    did_use.set(center.id, true)
    const l1s: npc[] = []
    center.uneed.links.forEach((lk) => {
        const cnpc = m.get(lk.npc_id)
        if (!cnpc) {
            return
        }
        l1s.push(cnpc)
        re.nodes.push({
            id: cnpc.id,
            label: cnpc.base.name,
        })
        re.edges.push({
            source: center.id,
            target: lk.npc_id,
            label: lk.description,
        })
        did_use.set(lk.npc_id, true)
    })
    l1s.forEach((npc) => {
        npc.uneed.links.forEach((lk) => {
            const cnpc = m.get(lk.npc_id)
            if (!cnpc || did_use.get(cnpc.id)) {
                return
            }
            re.nodes.push({
                id: cnpc.id,
                label: cnpc.base.name,
            })
            re.edges.push({
                source: npc.id,
                target: cnpc.id,
                label: lk.description,
            })
        })
    })

    return re
}
