const a2 = `require('../buildin-modules/sharp')`
const a1 = /require\("sharp"\)/

const fs = require('fs')
let oldtxt = fs.readFileSync('./dist/app.js', 'utf-8')
while (oldtxt.match(a1)) {
    oldtxt = oldtxt.replace(a1, a2)
}

fs.writeFileSync('./dist/app.js', oldtxt)
