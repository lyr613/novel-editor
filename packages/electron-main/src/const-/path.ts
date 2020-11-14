import path from 'path'
import { app } from 'electron'

/** 路径 */
export const paths = () => ({
    did_build_html: path.join(app.getAppPath(), 'build-page', 'index.html'),
})
