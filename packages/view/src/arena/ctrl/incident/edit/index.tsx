// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/function/router'
import Form from './form'

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
				next_router('incident')
			}}
			styles={{
				root: {
					margin: '10px 10px 0',
				},
			}}
		>
			返回
		</DefaultButton>
	)
}
