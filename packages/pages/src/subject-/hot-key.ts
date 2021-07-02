import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { SubBook } from './book'
import { SubBookEdit } from './book-edit'

class _hk {
    event$ = fromEvent<key>(document, 'keyup')
    sub_app_hot_key() {
        return this.event$.subscribe((e) => {
            const bid = SubBook.use_id$.value
            // 打开控制台
            if (e.altKey && e.ctrlKey) {
                if (e.keyCode === 73) {
                    ipc().send('hotkey_devtool', bid)
                }
            }
            if (e.altKey) {
                e.preventDefault()
                if (49 <= e.keyCode && e.keyCode <= 54) {
                    // alt +[1-6]
                    const cur_show = SubBookEdit.entry_show$.value
                    switch (e.keyCode) {
                        case 49:
                            SubBookEdit.entry_show$.next('')
                            SubBookEdit.entry_hold_recent_volume$.next(false)
                            SubBookEdit.entry_hold_volume$.next(
                                cur_show !== '' ? true : !SubBookEdit.entry_hold_volume$.value,
                            )
                            break
                        case 50:
                            SubBookEdit.entry_show$.next(cur_show !== 'npc-view' ? 'npc-view' : '')
                            SubBookEdit.entry_hold_recent_volume$.next(false)
                            SubBookEdit.entry_hold_volume$.next(false)
                            break
                        case 51:
                            SubBookEdit.entry_show$.next(cur_show !== 'cube-set' ? 'cube-set' : '')
                            SubBookEdit.entry_hold_recent_volume$.next(false)
                            SubBookEdit.entry_hold_volume$.next(false)
                            break
                        case 52:
                            SubBookEdit.entry_show$.next(cur_show !== 'threads-set' ? 'threads-set' : '')
                            SubBookEdit.entry_hold_recent_volume$.next(false)
                            SubBookEdit.entry_hold_volume$.next(false)
                            break
                        case 53:
                            SubBookEdit.entry_show$.next('')
                            SubBookEdit.entry_hold_recent_volume$.next(
                                cur_show !== '' ? true : !SubBookEdit.entry_hold_recent_volume$.value,
                            )
                            SubBookEdit.entry_hold_volume$.next(false)
                            break
                        case 54:
                            SubBookEdit.entry_show$.next(cur_show !== 'editer-size' ? 'editer-size' : '')
                            break

                        default:
                            break
                    }
                }
                // alt + ~ 清空所有
                if (e.keyCode === 192) {
                    SubBookEdit.entry_show$.next('')
                    SubBookEdit.entry_hold_recent_volume$.next(false)
                    SubBookEdit.entry_hold_volume$.next(false)
                }
            }
        })
    }
}

export const SubHotKey = new _hk()

interface key {
    /**
     * - 13 enter
     * - 32 space
     * - 38 ↑
     * - 40 ↓
     * - 37 ←
     * - 39 →
     * - 82 r
     * - 73 i
     * - 192 ~
     *
     */
    keyCode: number
    altKey: boolean
    ctrlKey: boolean
    shiftKey: boolean
    preventDefault: Function
}
