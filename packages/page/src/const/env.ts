import { electron } from './electron-help'

type env = 'web' | 'electron'
/**
 * 所在环境
 */
export const ENV = get_env()

function get_env() {
    if ((electron().CommandLine as any) === 'web') {
        return 'web'
    }
    return 'electron'
}
