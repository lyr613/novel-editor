class _e {
    /** 是否为开发状态 */
    get dev() {
        return process.env.NODE_ENV === 'development'
    }
}

/** 环境 */
export const ConstEnv = new _e()
