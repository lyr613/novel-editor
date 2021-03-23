import { BehaviorSubject } from 'rxjs'
import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { SubBook } from './book'

class _b {
    option$ = new BehaviorSubject(this.make())
    make(): book_option_vo {
        return {
            id: mk_uuid(),
            name: '',
            src: '',
            cover: '',
            last_20_chapter: [],
            editer: {
                size: {
                    x: 300,
                    w: 400,
                    y: 100,
                    h: 600,
                },
            },
        }
    }
    load() {
        const msg: msg_dto<book_option_vo> = ipc().sendSync('book_option_load', SubBook.use_id$.value)
        if (msg.b) {
            this.option$.next(msg.data)
            // console.log('load---')
        }
    }
    save(opt: book_option_vo) {
        const msg: msg_dto<book_option_vo> = ipc().sendSync('book_option_save', SubBook.use_id$.value, opt)
    }
}

export const SubBookOption = new _b()
