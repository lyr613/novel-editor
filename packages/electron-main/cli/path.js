const path = require('path')

const root = path.join(__dirname, '..')

module.exports = {
    /** 入口 */
    webpack_entry: path.join(root, 'src', 'app.ts'),
    webpack_output: path.join(root, 'build'),
    work_src: path.join(root, 'src'),
    did_build_html: path.join(root, 'build-page', 'index.html'),
}
