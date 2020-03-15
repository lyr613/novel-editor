import { electron } from '@/const'
import { ReplaySubject } from 'rxjs'

export const font_list$ = new ReplaySubject<string[]>(1)
const ipc = electron().ipcRenderer

ipc.send('find-font')

ipc.on('find-font', (_, msg) => {
    if (Array.isArray(msg)) {
        font_list$.next(msg)
    }
})
