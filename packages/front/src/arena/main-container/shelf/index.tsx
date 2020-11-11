import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { router1, router2shelf } from 'routers/define'
import NewOne from './new-one'
import Show from './show'

/** 书架 */
export default function Shelf() {
    return (
        <Switch>
            <Route path={'/' + router1().shelf.en + '/' + router2shelf().new.en} component={NewOne}></Route>
            <Route component={Show}></Route>
        </Switch>
    )
}
