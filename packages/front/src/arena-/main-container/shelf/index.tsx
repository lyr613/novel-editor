import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Rt } from 'router-'
import { router1, router2_shelf } from 'router-/define'
import Edit from './edit'
import Show from './show'

/** 书架 */
export default function Shelf() {
    return (
        <Switch>
            <Route path={Rt.make('shelf', router2_shelf().edit.en)} component={Edit}></Route>
            <Route component={Show}></Route>
        </Switch>
    )
}
