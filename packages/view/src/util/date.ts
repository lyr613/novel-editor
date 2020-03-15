/** 是否为闰年 */
export function be_run(year: number | string) {
    let y = Number(year) || 0
    y = Math.abs(y)
    if (y % 4 !== 0 || y % 400 !== 0) {
        return false
    }
    return true
}

/**
 * 此月有几天
 * @param month 1-12
 * @param year
 */
export function month_has_day(month: number | string, year: number | string) {
    const d31 = [1, 3, 5, 7, 8, 10, 12]
    const d30 = [4, 6, 9, 11]
    month = Number(month) || 1
    year = Number(year)
    if (d31.includes(month)) {
        return 31
    }
    if (d30.includes(month)) {
        return 30
    }
    return be_run(year) ? 29 : 28
}
