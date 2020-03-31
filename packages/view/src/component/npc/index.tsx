// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { npc_list$, find_npc_li_auto } from '@/source'
import { Label, ActionButton, TextField } from 'office-ui-fabric-react'

interface p {
    label: string
    did_ids: string[]
    on_reduce: (npc: npc) => void
    on_plus: (npc: npc) => void
}
/** 选择npc */
export default function NpcSelect(p: p) {
    const list_all = useObservable(() => npc_list$, [])
    const list_did = list_all.filter((v) => p.did_ids.includes(v.id))
    const [fitstr, set_fitstr] = useState('')
    const list_will = list_all.filter((v) => {
        if (p.did_ids.includes(v.id)) {
            return false
        }
        if (fitstr && !v.base.name.match(fitstr)) {
            return false
        }
        return true
    })
    useEffect(() => {
        find_npc_li_auto()
    }, [])
    return (
        <div className={s.NpcSelect}>
            <Label>{p.label}</Label>
            <div className={s.block}>
                <div className={s.left}>
                    <Label>已选</Label>
                </div>
                <div className={s.rest}>
                    {list_did.map((npc) => (
                        <ActionButton
                            onClick={() => {
                                p.on_reduce(npc)
                            }}
                            key={npc.id}
                            styles={{
                                label: {
                                    color: '#2b579a',
                                },
                            }}
                        >
                            {npc.base.name}
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
                        placeholder="过滤"
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
                    {list_will.map((npc) => (
                        <ActionButton onClick={() => p.on_plus(npc)} key={npc.id}>
                            {npc.base.name}
                        </ActionButton>
                    ))}
                </div>
            </div>
        </div>
    )
}
