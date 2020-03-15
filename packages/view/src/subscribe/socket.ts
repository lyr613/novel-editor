import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { WsBaseurl } from '@/const'
import { interval, timer, of } from 'rxjs'
import { filter, catchError } from 'rxjs/operators'

class obj {
    [k: string]: any
}

const subj = webSocket({
    url: WsBaseurl + 'sid-A',
    deserializer(v): obj {
        const d = v.data
        if (typeof d === 'string') {
            return {}
        }
        return v.data
    },
})
const Socket$ = subj.pipe()

timer(1000, 10000).subscribe(() => {
    subj.next({ heart: '2' })
})

// const ob1 = Socket$.subscribe(v => {
//     console.log(v)
// })
// const ob2 = Socket$.subscribe(v => {
//     console.log(v.kkk)
// })
