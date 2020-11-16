const fs = require('fs')
const path = require('path')
const paths = require('../paths')

// react页面开发占用端口
// elec开发时加载这个页面

const port = 7098

hand_front()
hand_elec()

function hand_front() {
    const src_f = path.join(paths.front, '.env')
    const txt0 = fs.readFileSync(src_f, 'utf-8')
    const txt1 = txt0.replace(/PORT=\d+/, `PORT=${port}`)
    fs.writeFileSync(src_f, txt1)
    console.log(src_f)
}

function hand_elec() {
    const src_f = path.join(paths.elec, 'src', 'const-', 'path.ts')
    const txt0 = fs.readFileSync(src_f, 'utf-8').split('\n')
    txt0.forEach((line, i) => {
        if (line.match('dev_html')) {
            txt0[i] = txt0[i].replace(/localhost:\d+/, `localhost:${port}`)
        }
    })
    const txt1 = txt0.join('\n')
    fs.writeFileSync(src_f, txt1)
    console.log(src_f)
}
