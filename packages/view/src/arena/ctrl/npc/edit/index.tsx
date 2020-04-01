// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/function/router'
import Form from './form'
import { npc_use_id$, edit_npc_auto, npc_edit$ } from '@/source'

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

function Back() {
    return (
        <DefaultButton
            onClick={() => {
                next_router('npc')
            }}
            styles={{
                root: {
                    margin: '10px ',
                },
            }}
        >
            返回
        </DefaultButton>
    )
}
