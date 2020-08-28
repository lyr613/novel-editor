import { BehaviorSubject } from 'rxjs'

type theme = 'word' | 'excel' | 'ppt' | 'onenote' | 'gray' | 'dark'
/** 颜色主题 */
/** 主题的颜色
 * 下标0-7主题渐变色
 * 8 普通文本
 * 9 keyword
 */
export const theme_colors: { [k in theme]: string[] } = {
    word: [
        '#002050',
        '#124078',
        '#2b579a',
        '#3c65a4',
        '#4a78b0',
        '#7da3c6',
        '#a5b9d1',
        '#e3ecfa',
        '#000000',
        '#002050',
    ],
    excel: [
        '#004b1c',
        '#0e5c2f',
        '#217346',
        '#3f8159',
        '#4e9668',
        '#6eb38a',
        '#9fcdb3',
        '#e9f5ee',
        '#000000',
        '#004b1c',
    ],
    ppt: ['#740912', '#a92b1a', '#b7472a', '#c75033', '#e86e58', '#ed9583', '#fdc9b5', '#fcf0ed', '#000000', '#740912'],
    onenote: [
        '#4c0f6c',
        '#5c1384',
        '#7719aa',
        '#9953c0',
        '#d0afe2',
        '#ddc5ec',
        '#efdffa',
        '#f5edfd',
        '#000000',
        '#4c0f6c',
    ],
    gray: [
        '#201f1e',
        '#252423',
        '#323130',
        '#605e5c',
        '#797775',
        '#a19f9d',
        '#c8c6c4',
        '#edebe9',
        '#000000',
        '#740912',
    ],
    dark: [
        '#edebe9',
        '#c8c6c4',
        '#a19f9d',
        '#797775',
        '#605e5c',
        '#323130',
        '#252423',
        '#201f1e',
        '#aaaaaa',
        '#edebe9',
    ],
}
