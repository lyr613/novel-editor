import React, { useState, useEffect } from 'react'
import { next_router } from 'routers/pusher'

/** Some */
export default function Some() {
    return (
        <div>
            {[2, 3, 4].map((n) => (
                <div
                    onClick={() => {
                        next_router(n + '')
                    }}
                    key={n}
                    style={{
                        padding: '20px',
                        fontSize: '20px',
                    }}
                >
                    {n}
                </div>
            ))}
        </div>
    )
}
