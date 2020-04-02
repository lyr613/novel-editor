import { BehaviorSubject } from 'rxjs'
import { fs_read, fs_write } from '@/source'
import { debounceTime, skip } from 'rxjs/operators'
import { ipc } from '@/const'

interface wh {
    width: number
    height: number
}
interface setting {
    /** 通用 */
    common: {
        /** 主题 */
        theme: 'word' | 'excel' | 'ppt' | 'onenote' | 'gray' | 'dark'
    }
    /** 书架页 */
    shelf: {
        /** 书目列表 */
        book_list: string[]
    }
    /** 编辑页 */
    editer: {
        /** 大纲模块宽高, 其他模块联动更改 */
        outline_layout: wh
        /** 编辑窗口宽高 */
        editer_layout: wh
        /** 编辑窗口偏移 */
        editer_transform: wh
    }
    /** 敏感词 */
    sensitive?: string[]
}

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
    }
}

export function load_edit_set() {
    const obj = fs_read<setting>('json', [ipc().sendSync('app_set_src'), 'settings.json'])
    return obj || default_set()
}

editer_setting$.pipe(skip(2), debounceTime(2000)).subscribe((obj) => {
    fs_write('json', [ipc().sendSync('app_set_src'), 'settings.json'], obj)
})
