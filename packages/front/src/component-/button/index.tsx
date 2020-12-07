import { Button, ButtonProps } from '@fluentui/react'
import React, { useState, useEffect } from 'react'

interface rest {
    with_theme?: boolean
}
export default function OfficeButton(p: ButtonProps & rest) {
    return <Button {...p} primary={p.with_theme} />
}
