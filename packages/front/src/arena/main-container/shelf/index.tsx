import React, { useState, useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import NewOne from './new-one'
import Show from './show'

/** Shelf */
export default function Shelf() {
    return (
        <Switch>
            <Route path={'/' + 'shelf' + '/' + 'new'} component={NewOne}></Route>
            <Route component={Show}></Route>
        </Switch>
    )
}
