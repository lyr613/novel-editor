const path = require('path')

/** packages文件夹 */
const root = path.join(__dirname, '..')

console.log(root)

module.exports = {
    front: path.join(root, 'front'),
    elec: path.join(root, 'electron-main'),
    src: path.join(root, 'src'),
}
