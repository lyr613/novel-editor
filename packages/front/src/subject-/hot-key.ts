import { fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { SubBook } from './book'

class _hk {
    event$ = fromEvent<key>(document, 'keyup')
    sub_app_hot_key() {
        return this.event$.subscribe((e) => {
            const bid = SubBook.use_id$.value
            console.log('bid', bid)

            if (e.altKey && e.ctrlKey) {
                if (e.keyCode === 73) {
                    ipc().send('hotkey_devtool', bid)
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
     */
    keyCode: number
    altKey: boolean
    ctrlKey: boolean
    shiftKey: boolean
}
