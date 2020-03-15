import { be_run, month_has_day } from './date'

// 各种转化

/** 性别 -> 编码 */
export function gender_encode(s: string) {
    switch (s) {
        case '女':
            return '0'
        case '男':
            return '1'
        default:
            return '2'
    }
}
/** 性别 <- 编码 */
export function gender_decode(s: '0' | '1' | '2') {
    switch (s) {
        case '0':
            return '女'
        case '1':
            return '男'

        default:
            return '其他'
    }
}

/** 日期 -> 编码 */
export function date_encode(ymd3: (number | string)[]) {
    const ymd = ymd3.map((s) => Number(s) || 1)

    let re = 0
    let [y, m, d] = ymd
    if (y >= 0) {
        while (y > 0) {
            y--
            re += be_run(y) ? 366 : 365
        }
        while (m > 1) {
            m--
            re += month_has_day(m, ymd[1])
        }
        re += d - 1
        return re
    } else {
        re = 1
        while (y < -1) {
            y++
            re += be_run(y) ? 366 : 365
        }
        while (m < 12) {
            m++
            re += month_has_day(m, ymd[1])
        }
        const dhas = month_has_day(ymd[1], ymd[0])
        re += dhas - d
        re = 0 - re
        return re
    }
}
/** 日期 <- 编码 */
export function date_decode(n: number) {
    const ymd = n >= 0 ? [0, 1, 1] : [-1, 12, 31]
    n++
    if (n > 0) {
        while (n > 370) {
            n -= be_run(ymd[0]) ? 366 : 365
            ymd[0]++
        }
        while (n > month_has_day(ymd[1], ymd[0])) {
            n -= month_has_day(ymd[1], ymd[0])
            ymd[1]++
        }
        ymd[2] = n
    } else {
        while (n < -370) {
            n += be_run(ymd[0]) ? 366 : 365
            ymd[0]--
        }
        let has_day = month_has_day(ymd[1], ymd[0])
        while (n <= 0 - has_day) {
            n += has_day
            ymd[1]--
            has_day = month_has_day(ymd[1], ymd[0])
        }
        ymd[2] = has_day + n
    }
    return ymd
}

export function format_date(n: number | (string | number)[]) {
    const ymd = typeof n === 'number' ? date_decode(n) : n
    const [year, month, day] = ymd
    return `${year}年${month}月${day}日`
}
