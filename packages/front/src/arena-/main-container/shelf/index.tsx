import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { router1, router2_shelf } from 'router-/define'
import { mk_router } from 'router-/pusher'
import NewOne from './new-one'
import Show from './show'

/** 书架 */
export default function Shelf() {
    return (
        <Switch>
            <Route path={mk_router('shelf', router2_shelf().new.en)} component={NewOne}></Route>
            <Route component={Show}></Route>
        </Switch>
    )
}
