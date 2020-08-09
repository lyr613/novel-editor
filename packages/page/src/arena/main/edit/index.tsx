import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { Switch, Route } from 'react-router-dom'
import { ROUTERL2 } from '@/router'
import ChapterSet from './chapter-set'
import Editor from './editor'

/** 编辑页 */
export default function Edit() {
    return (
        <Switch>
            <Route path={'/edit/' + ROUTERL2.edit.chapter_set} component={ChapterSet} />
            <Route component={Editor} />
        </Switch>
    )
}
