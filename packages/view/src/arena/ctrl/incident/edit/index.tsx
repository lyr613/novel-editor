// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/router/router'
import Form from './form'
import { edit_incident_auto, incident_use_id$, incident_edit$ } from '@/source/incident'

export default function Edit() {
    useEffect(() => {
        edit_incident_auto()
        return () => {
            incident_use_id$.next(incident_edit$.value.id)
        }
    }, [])
    return (
        <>
            <Back />
            <Form />
        </>
    )
}

function Back() {
    return (
        <DefaultButton
            onClick={() => {
                next_router('incident')
            }}
            styles={{
                root: {
                    margin: '10px 10px 0',
                },
            }}
        >
            返回
        </DefaultButton>
    )
}
