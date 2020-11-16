import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { router1, router2_option, router2_shelf } from 'routers/define'
import { mk_router, router_pusher$ } from 'routers/pusher'
import LabelBar from 'component-/label-bar'
import EmptyRouter from 'component-/empty-router'

/** 设置 */
export default function Option() {
    return (
        <>
            <LabelBar
                items={Object.values(router2_option()).map((it) => ({
                    key: it.cn,
                    data: it.en,
                }))}
                hook_select_end={(it) => {
                    const rt = mk_router('option', it.data)
                    router_pusher$.next(rt)
                }}
            />
            <Switch>
                <Route path={mk_router('shelf', router2_shelf().new.en)}></Route>
                <Route component={EmptyRouter(mk_router('option', router2_option().ui.en))}></Route>
            </Switch>
        </>
    )
}
interface item_vo {
    key: string
    data: any
}
const items: item_vo[] = [
    {
        key: '编辑',
        data: {
            route: 'edit',
        },
    },
    {
        key: '显示',
        data: {
            route: 'ui',
        },
    },
    {
        key: '提醒',
        data: {
            route: 'remind',
        },
    },
]
