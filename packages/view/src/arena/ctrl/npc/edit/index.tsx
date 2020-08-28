// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import Form from './form'
import { edit_npc_auto, npc_use_id$, npc_edit$ } from '@/source/npc'
import Back from './back'

/**
 * 编辑页
 */
export default function EditUser() {
    useEffect(() => {
        edit_npc_auto()
        return () => {
            npc_use_id$.next(npc_edit$.value.id)
        }
    }, [])
    return (
        <>
            <Back />
            <Form></Form>
        </>
    )
}
