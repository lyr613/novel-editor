import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { router1, router2shelf } from 'routers/define'
import { mk_router } from 'routers/pusher'

/** 设置 */
export default function Option() {
    return (
        // <Switch>
        //     <Route path={mk_router('shelf', router2shelf().new.en)} component={NewOne}></Route>
        //     <Route component={Show}></Route>
        // </Switch>
        <div>option</div>
    )
}
