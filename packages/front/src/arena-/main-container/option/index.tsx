import React, { useState, useEffect } from 'react'
import { Switch, useLocation } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { router1, router2_option, router2_shelf } from 'router-/define'
import { mk_router, router_pusher$ } from 'router-/pusher'
import LabelBar from 'component-/label-bar'
import EmptyRouter from 'component-/empty-router'
import Ui from './ui'

/** 2级路由菜单配置 */
const optrts = Object.values(router2_option()).map((it) => ({
    key: it.cn,
    data: it.en,
}))

const default_rt = optrts[1]

/** 设置 */
export default function Option() {
    const [key, next_key] = useState(default_rt.key)
    return (
        <>
            <LabelBar
                items={optrts}
                use_key={key}
                on_item_click={(it) => {
                    const rt = mk_router('option', it.data)
                    router_pusher$.next(rt)
                    next_key(it.key)
                }}
            />
            <Switch>
                <Route path={mk_router('option', router2_option().edit.en)}></Route>
                <Route path={mk_router('option', router2_option().remind.en)}></Route>
                <Route path={mk_router('option', router2_option().ui.en)} component={Ui}></Route>
                <Route component={EmptyRouter(mk_router('option', default_rt.data))}></Route>
            </Switch>
        </>
    )
}
