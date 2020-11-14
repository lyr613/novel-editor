const path = require('path')

const root = path.join(__dirname, '..')

module.exports = {
    /** 入口 */
    webpack_entry: path.join(root, 'src', 'app.ts'),
    webpack_output: path.join(root, 'build'),
    webpack_watch: path.join(root, 'watch'),
}
