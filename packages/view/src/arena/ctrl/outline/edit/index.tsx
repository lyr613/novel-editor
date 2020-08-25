// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/router/router'
import Form from './form'

/**
 * 编辑一条大纲
 */
export default function Edit() {
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
                next_router('outline')
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
