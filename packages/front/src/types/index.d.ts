declare type int = number
declare type float = number

interface Window {
    /** 配置文件 */
    SETTING: {
        /** 发布时间 */
        deploy_time: string
    }
}

declare interface Fetch<T = any> {
    status: number
    msg: string
    data: T
}
