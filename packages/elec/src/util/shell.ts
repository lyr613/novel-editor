import cp from 'child_process'

/** 多行命令拼接成一行 */
export function build_shell(lines: string[]) {
    const pp = process.platform
    let brige = '&&'
    if (pp === 'win32') {
        const w = cp.execSync('(dir 2>&1 *`|echo CMD);&<# rem #>echo PowerShell').toString()
        console.log('w', w)

        if (w === 'PowerShell') {
            brige = ';'
        }
    }
    return lines.join(' ' + brige + ' ')
}
