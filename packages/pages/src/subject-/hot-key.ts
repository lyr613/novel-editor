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
                if (e.keyCode === 192) {
                    SubBookEdit.entry_show$.next('')
                    SubBookEdit.entry_hold_recent_volume$.next(false)
                    SubBookEdit.entry_hold_volume$.next(false)
                }
                if (e.keyCode === 49) {
                    SubBookEdit.entry_show$.next('')
                    SubBookEdit.entry_hold_recent_volume$.next(false)
                    SubBookEdit.entry_hold_volume$.next(!SubBookEdit.entry_hold_volume$.value)
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
}
