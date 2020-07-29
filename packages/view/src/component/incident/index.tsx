// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { Label, ActionButton, TextField } from 'office-ui-fabric-react'
import { incident_li$, incident_find$ } from '@/source/incident'

interface p {
    label: string
    did_ids: string[]
    on_reduce: (npc: incident) => void
    on_plus: (npc: incident) => void
}
/** 选择npc */
export default function IncidentSelect(p: p) {
    const list_all = useObservable(() => incident_li$, [])
    const list_did = list_all.filter((v) => p.did_ids.includes(v.id))
    const [fitstr, set_fitstr] = useState('')
    const list_will = list_all.filter((v) => {
        if (p.did_ids.includes(v.id)) {
            return false
        }
        if (fitstr && !v.label.match(fitstr)) {
            return false
        }
        return true
    })
    useEffect(() => {
        incident_find$.next()
    }, [])
    return (
        <div className={s.IncidentSelect}>
            <Label>{p.label}</Label>
            <div className={s.block}>
                <div className={s.left}>
                    <Label>已选</Label>
                </div>
                <div className={s.rest}>
                    {list_did.map((incident) => (
                        <ActionButton
                            onClick={() => {
                                p.on_reduce(incident)
                            }}
                            key={incident.id}
                            styles={{
                                label: {
                                    color: '#2b579a',
                                },
                            }}
                        >
                            {incident.label}
                        </ActionButton>
                    ))}
                </div>
            </div>
            <div className={s.block}>
                <div className={s.left}>
                    <Label>可选</Label>
                    <TextField
                        value={fitstr}
                        onChange={(_, ss) => {
                            set_fitstr(ss || '')
                        }}
                        onFocus={() => {
                            set_fitstr('')
                        }}
                        underlined
                        placeholder="搜索"
                        styles={{
                            root: {
                                margin: '0 10px',
                                width: '60px',
                            },
                            fieldGroup: {
                                backgroundColor: 'transparent',
                            },
                        }}
                    ></TextField>
                </div>
                <div className={s.rest}>
                    {list_will.map((incident) => (
                        <ActionButton onClick={() => p.on_plus(incident)} key={incident.id}>
                            {incident.label}
                        </ActionButton>
                    ))}
                </div>
            </div>
        </div>
    )
}
