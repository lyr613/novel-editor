// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { TextField } from 'office-ui-fabric-react'

interface p {
	label: string
	value1: string
	onChange1: (str: string) => void
	value2: string
	onChange2: (str: string) => void
	value3: string
	onChange3: (str: string) => void
}

const sty_year = {
	root: {
		width: '100px',
	},
}
const sty_m_d = {
	root: {
		width: '80px',
	},
}

/**
 * 3连输入YMD
 * 建议使用align-items: flex-end包裹
 */
export default function DateYMD(p: p) {
	return (
		<>
			<TextField
				label={p.label}
				suffix="年"
				value={p.value1}
				onChange={(_, str) => {
					p.onChange1(year_help(str))
				}}
				styles={sty_year}
				autoComplete="off"
			></TextField>
			<TextField
				suffix="月"
				value={p.value2}
				onChange={(_, str) => {
					p.onChange2(month_help(str))
				}}
				styles={sty_m_d}
				autoComplete="off"
			></TextField>
			<TextField
				suffix="日"
				value={p.value3}
				onChange={(_, str) => {
					p.onChange3(day_help(str))
				}}
				styles={sty_m_d}
				autoComplete="off"
			></TextField>
		</>
	)
}

function year_help(s?: string) {
	s = (s || '').replace(/[^0-9-+=]/g, '')
	let head = ''
	if (/-/.test(s)) {
		head = '-'
	}
	if (/[+=]/.test(s)) {
		head = ''
	}
	s = s.replace(/[^0-9]/g, '')
	const n = Number(s) || 0
	if (n === 0) {
		return '0'
	}
	return head + n
}

function month_help(s?: string) {
	s = (s || '1').slice(-2)
	let n = Number(s) || 0
	if (n > 12) {
		n %= 10
	}
	if (n === 0) {
		n = 1
	}
	return n + ''
}

function day_help(s?: string) {
	s = (s || '1').slice(-2)
	let n = Number(s) || 1

	if (n > 31) {
		n %= 10
	}
	if (n < 1) {
		n = 1
	}
	return n + ''
}
