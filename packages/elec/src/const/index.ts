import { app } from 'electron'

export const ENV = {
    env: process.env.NODE_ENV as 'development' | '',
    app_path: app.getAppPath(),
    // user_path: app.getPath('userData'),
}

export const REGS = {
    // order-名字-32位uuid
    chapter_name: /^[0-9a-z]{32}$/,
    node_name: /^[0-9]+##.+##[0-9a-z]{32}\.txt$/,
}
