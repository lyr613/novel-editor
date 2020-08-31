// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { next_router } from '@/router/router'
import Form from './form'
import QvButton from '@/component/ui/button'

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
        <QvButton
            onClick={() => {
                next_router('outline')
            }}
            style={{
                margin: '10px ',
            }}
        >
            返回
        </QvButton>
    )
}
