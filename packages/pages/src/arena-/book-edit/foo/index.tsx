import React, { useState, useEffect } from 'react'
import { StyleTheme } from 'style-/theme'
import { SubBookEdit } from 'subject-/book-edit'
import style from './style.module.css'
import { DefaultButton, Label, TextField, Stack } from '@fluentui/react'
import { take } from 'rxjs/operators'
import { SubHotKey } from 'subject-/hot-key'
/**
 */
export default function Foo() {
    return (
        <div
            className={style.Foo}
            style={{
                backgroundColor: StyleTheme.style_vars.themeLighter,
            }}
        >
            <ZiShu />
            <FormatT />
        </div>
    )
}

/** 字数 */
function ZiShu() {
    const [n, next_n] = useState(0)
    const [n_all, next_n_all] = useState(0)
    const [n_fei_kong, next_n_fei_kong] = useState(0)
    const [n_zhongwen, next_n_zhongwen] = useState(0)
    useEffect(() => {
        const ob = SubBookEdit.cur_editer_txt$.subscribe((t) => {
            let [na, nfk, nzw] = [t.length, 0, 0]
            t.split('').forEach((v) => {
                if (v.match(/[\u4e00-\u9fa5]/)) {
                    nzw++
                }
                if (v.match(/\S/)) {
                    nfk++
                }
            })
            next_n_all(na)
            next_n_fei_kong(nfk)
            next_n_zhongwen(nzw)
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={style.ZiShu}>
            <Label>统计</Label>

            <div className={style.ZiShuCell}>文本长度: {n_all}</div>
            <div className={style.ZiShuCell}>中文字符: {n_zhongwen}</div>
            <div className={style.ZiShuCell}>非空字符: {n_fei_kong}</div>
        </div>
    )
}

function FormatT() {
    const [left_pad, next_left_pad] = useState(2)
    const [split_line, next_split_line] = useState(1)
    const [douhao, next_douhao] = useState('，')
    const [juhao, next_juhao] = useState('。')
    const [xiao_kong, next_xiao_kong] = useState('1')

    function _format() {
        SubBookEdit.cur_editer_txt$.pipe(take(1)).subscribe((txt) => {
            let arr = txt
                .split(/\n/)
                .map((s) => s.trim())
                .filter((s) => !!s)
            // .map((s) => '　　' + s)
            if (xiao_kong === '1') {
                arr = arr.map((s) => s.replace(/\s/g, ''))
            }
            if (douhao.length) {
                const dhu = douhao[0]
                arr = arr.map((s) => s.replace(/[，,]/g, dhu))
            }
            if (juhao.length) {
                const jhu = juhao[0]
                arr = arr.map((s) => s.replace(/[。．.]/g, jhu))
            }
            if (left_pad) {
                const lp = ''.padEnd(left_pad, '　')
                arr = arr.map((s) => lp + s)
            }
            const sll = ''.padStart(split_line + 1, '\n')

            const t2 = arr.join(sll)
            SubBookEdit.cur_editer_txt_updater$.next(t2)
        })
    }
    useEffect(() => {
        const ob = SubHotKey.event$.subscribe((k) => {
            if (k.altKey && k.keyCode === 70) {
                _format()
            }
        })
        return () => {
            ob.unsubscribe()
        }
    }, [])
    return (
        <div className={style.FormatT}>
            <Label>格式化</Label>
            <div className={style.FormatTForm}>
                <Stack horizontal verticalAlign="end">
                    <TextField
                        className={style.FormatTText}
                        label="前置空格"
                        value={left_pad + ''}
                        onChange={(_, ns) => {
                            const n = Number(ns) || 0
                            next_left_pad(n)
                        }}
                    ></TextField>
                    <TextField
                        className={style.FormatTText}
                        label="段落间空行"
                        value={split_line + ''}
                        onChange={(_, ns) => {
                            const n = Number(ns) || 0
                            next_split_line(n)
                        }}
                    ></TextField>
                    <TextField
                        className={style.FormatTText}
                        label="逗号"
                        value={douhao}
                        onChange={(_, ns) => {
                            const n2 = (ns || '').trim()
                            next_douhao(n2)
                        }}
                    ></TextField>
                    <TextField
                        className={style.FormatTText}
                        label="句号"
                        value={juhao}
                        onChange={(_, ns) => {
                            const n2 = (ns || '').trim()
                            next_juhao(n2)
                        }}
                    ></TextField>
                    <TextField
                        className={style.FormatTText}
                        label="消除意外空格"
                        placeholder="1消除0不消"
                        value={xiao_kong}
                        onChange={(_, ns) => {
                            let n2 = (ns || '').trim()
                            if (!n2.length) {
                                n2 = '0'
                            } else {
                                if (n2.slice(-1)[0] === '0') {
                                    n2 = '0'
                                } else {
                                    n2 = '1'
                                }
                            }
                            next_xiao_kong(n2)
                        }}
                    ></TextField>
                    <DefaultButton onClick={_format}>格式化</DefaultButton>
                </Stack>
            </div>
        </div>
    )
}
