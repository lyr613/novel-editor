/** 环境 */
export const envs = () => ({
    /** 开发状态 */
    dev: process.env.NODE_ENV === 'development',
})

class _e {
    /** 是否为开发状态 */
    get dev() {
        return process.env.NODE_ENV === 'development'
    }
}

export const ConstEnv = new _e()
