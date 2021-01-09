import React, { useState, useEffect } from 'react'
import { Rt } from 'router-'

export default function EmptyRouter(goto: string) {
    return function Empty() {
        useEffect(() => {
            setTimeout(() => {
                Rt.pusher$.next(goto)
            }, 0)
        }, [])
        return null
    }
}
