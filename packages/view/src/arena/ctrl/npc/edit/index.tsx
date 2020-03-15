// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { DefaultButton } from 'office-ui-fabric-react'
import { next_router } from '@/function/router'
import Form from './form'
import { npc_focu$, create_npc } from '@/source'

/**
 * 编辑页
 */
export default function EditUser() {
	useEffect(() => {
		return () => {
			npc_focu$.next(create_npc())
		}
	}, [])
	return (
		<>
			<Back />
			<Form></Form>
		</>
	)
}

function Back() {
	return (
		<DefaultButton
			onClick={() => {
				next_router('npc')
			}}
			styles={{
				root: {
					margin: '10px ',
				},
			}}
		>
			返回
		</DefaultButton>
	)
}
