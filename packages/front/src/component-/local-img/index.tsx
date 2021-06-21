import React, { useState, useEffect } from 'react'
import { ipc } from 'tool-/electron'

interface p {
    src: string
    style?: React.CSSProperties
}
export default function LocalImg(p: p) {
    const [src0, next_src0] = useState('')
    useEffect(() => {
        const re2 = ipc().sendSync('fs_read_img', p.src)
        if (!re2.b) {
            return
        }
        const f = new FileReader()
        const f0 = new File([re2.data], 'cover.jpg', { type: 'image/jpg' })
        f.onload = () => {
            const fre = f.result as string
            next_src0(fre)
        }
        f.readAsDataURL(f0)
    }, [p])
    if (!src0) {
        return null
    }
    return <img src={src0} alt="" style={p.style} />
}
