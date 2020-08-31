// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { Dialog, DialogType, TextField, DialogFooter } from 'office-ui-fabric-react'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { shallowCopy } from '@/rx/shallow-copy'
import { editer_setting$ } from '@/subject'
import QvButton from '@/component/ui/button'
import QvLabel from '@/component/ui/label'

const will_delete$ = new BehaviorSubject('')

/** 敏感词 */
export default function Sensitive() {
    return (
        <>
            <label className={s.Label}>敏感词</label>

            <div className={s.Sensitive}>
                <List />
                <AddOne />
                <DeleteOne />
            </div>
        </>
    )
}

function List() {
    const opt = useObservable(() => editer_setting$.pipe(shallowCopy()))
    const list = opt?.sensitive ?? []
    useEffect(() => {
        console.log('敏感词列表', list)
    }, [list])

    return (
        <div className={s.List}>
            {list.map((word) => (
                <QvLabel
                    key={word}
                    onClick={() => {
                        will_delete$.next(word)
                    }}
                    style={{
                        margin: '0 0 10px 10px',
                    }}
                >
                    {word}
                </QvLabel>
            ))}
        </div>
    )
}

function AddOne() {
    const [show, set_show] = useState(false)
    const [word, set_word] = useState('')

    return (
        <>
            <QvButton
                withTheme
                onClick={() => {
                    set_show(true)
                }}
                style={{
                    margin: '10px',
                }}
            >
                添加
            </QvButton>
            <Dialog
                hidden={!show}
                onDismiss={() => {
                    set_show(false)
                }}
                modalProps={{
                    isBlocking: true,
                    topOffsetFixed: true,
                }}
                dialogContentProps={{
                    type: DialogType.normal,
                    closeButtonAriaLabel: 'Close',
                    title: '添加敏感词',
                    subText: '多个敏感词以空格分割',
                }}
            >
                <TextField
                    value={word}
                    onChange={(_, ns) => {
                        const nss = ns || ''
                        set_word(nss)
                    }}
                ></TextField>
                <DialogFooter>
                    <QvButton
                        withTheme
                        disabled={!word.length}
                        onClick={() => {
                            _add_words(word)
                            set_show(false)
                            set_word('')
                        }}
                    >
                        好
                    </QvButton>
                    <QvButton
                        onClick={() => {
                            set_show(false)
                        }}
                    >
                        取消
                    </QvButton>
                </DialogFooter>
            </Dialog>
        </>
    )
}

function _add_words(ws: string) {
    const words = ws.split(/\s+/).filter(Boolean)
    const opt = editer_setting$.value
    const arr = opt.sensitive ?? []
    opt.sensitive = arr
    words.forEach((word) => {
        add_one(word)
    })
    editer_setting$.next(opt)
    function add_one(word: string) {
        for (let i = 0; i < arr.length; i++) {
            let [a, b] = [arr[i], word]
            if (a.length > b.length) {
                ;[a, b] = [b, a]
            }
            if (b.includes(a)) {
                arr[i] = a
                return
            }
        }
        arr.push(word)
    }
}

function DeleteOne() {
    const word = useObservable(() => will_delete$)
    const show = !!word

    return (
        <Dialog
            hidden={!show}
            onDismiss={() => {
                will_delete$.next('')
            }}
            modalProps={{
                isBlocking: true,
                topOffsetFixed: true,
            }}
            dialogContentProps={{
                type: DialogType.normal,
                closeButtonAriaLabel: 'Close',
                title: '删除敏感词',
                subText: word || '',
            }}
        >
            <DialogFooter>
                <QvButton
                    withTheme
                    onClick={() => {
                        const opt = editer_setting$.value
                        opt.sensitive = (opt.sensitive ?? []).filter((v) => v !== word)
                        editer_setting$.next(opt)

                        will_delete$.next('')
                    }}
                >
                    好
                </QvButton>
                <QvButton
                    onClick={() => {
                        will_delete$.next('')
                    }}
                >
                    取消
                </QvButton>
            </DialogFooter>
        </Dialog>
    )
}
