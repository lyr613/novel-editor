import { take } from 'rxjs/operators'
import { editer_setting$ } from '@/subject/edit-setting'

/** 重载滚动条样式 */
export function overload_style_scroll() {
    editer_setting$.pipe(take(1)).subscribe((edit) => {
        //
        if (!edit) {
            return
        }
        const form = edit.common.scroll ?? {
            width: '',
            color: '',
        }
        const width = form.width.trim() ? Number(form.width.trim()) : -1
        const color = form.color
        const box = document.head
        const old = document.getElementById('style-scroll')
        if (old) {
            box.removeChild(old)
        }
        const ns = document.createElement('style')

        ns.innerHTML = `
            ::-webkit-scrollbar {
                width: ${width}px;
                height: ${width}px;
            }
            ::-webkit-scrollbar-thumb {
                background-color: ${color};
            }
        `
        ns.id = 'style-scroll'
        document.head.appendChild(ns)
    })
}
