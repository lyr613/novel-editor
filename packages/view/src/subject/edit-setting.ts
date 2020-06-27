import { BehaviorSubject } from 'rxjs'
import { fs_read, fs_write } from '@/source'
import { debounceTime, skip } from 'rxjs/operators'
import { ipc } from '@/const'

/** 编辑器设置 */
export const editer_setting$ = new BehaviorSubject(default_set())

/** 默认 */
function default_set(): setting {
    return {
        common: {
            theme: 'word',
        },
        shelf: {
            book_list: [],
        },
        editer: {
            outline_layout: {
                width: 200,
                height: 200,
            },
            editer_layout: {
                width: 100,
                height: 100,
            },
            editer_transform: {
                width: 0,
                height: 0,
            },
        },
        sensitive: [],
        font: {
            size: 16,
            family: 'syhei4',
        },
        git: false,
    }
}

editer_setting$.pipe(skip(1), debounceTime(2000)).subscribe((obj) => {
    fs_write('json', [ipc().sendSync('app_set_src'), 'settings.json'], obj)
})
