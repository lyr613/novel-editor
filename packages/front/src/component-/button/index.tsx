import { PrimaryButton, DefaultButton, IButtonProps } from '@fluentui/react'
import React, { useState, useEffect } from 'react'

interface rest {
    with_theme?: boolean
}
export default function OfficeButton(p: IButtonProps & rest) {
    return p.with_theme ? <PrimaryButton {...p} /> : <DefaultButton {...p} />
}
