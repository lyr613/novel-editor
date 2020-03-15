// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Icon, IIconProps } from 'office-ui-fabric-react'

interface p {
	icon: 'Settings' | 'Edit' | 'Delete' | 'Add' | 'Search'
	add_class?: string[]
}
/** 图标按钮 */
export default function IconButton(p: p & IIconProps) {
	const cls = [s.IconButton, ...(p.add_class || [])].join(' ')
	return <Icon className={cls} iconName={p.icon} {...p}></Icon>
}
