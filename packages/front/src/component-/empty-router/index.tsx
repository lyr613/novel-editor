import React, { useState, useEffect } from 'react'
import { router_pusher$ } from 'router-/pusher'

export default function EmptyRouter(goto: string) {
    return function Empty() {
        useEffect(() => {
            setTimeout(() => {
                router_pusher$.next(goto)
            }, 0)
        }, [])
        return null
    }
}
