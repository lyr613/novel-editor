// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import s from './s.module.scss'
import Shelf from './shelf'
// import Chapter from './DELETE-chapter'
import Edit from './edit'
import Help from './help'
import Npc from './npc'
import Outline from './outline'
import Incident from './incident'
import Option from './option'
import Zipp from './zip'
import Table from './table'
import Search from './search'
import Mapp from './map'
import Git from './git'

export default function MainCtrl() {
	return (
		<div className={s.Stage}>
			<Switch>
				{/* <Route exact path="/chapter" component={Chapter}></Route> */}
				<Route exact path="/shelf" component={Shelf}></Route>
				<Route exact path="/edit" component={Edit}></Route>
				<Route exact path="/help" component={Help}></Route>
				<Route path="/npc" component={Npc}></Route>
				<Route path="/search" component={Search}></Route>
				<Route path="/table" component={Table}></Route>
				<Route path="/map" component={Mapp}></Route>
				<Route path="/git" component={Git}></Route>
				<Route path="/incident" component={Incident}></Route>
				<Route path="/outline" component={Outline}></Route>
				<Route path="/option" component={Option}></Route>
				<Route path="/zip" component={Zipp}></Route>
				<Route path="*" component={Shelf}></Route>
			</Switch>
		</div>
	)
}
