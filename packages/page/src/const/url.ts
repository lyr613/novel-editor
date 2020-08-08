/** @returns host project */
function get_server() {
    const node = process.env.NODE_ENV
    if (node === 'development') {
        return ['localhost:9090', '/api']
    }
    return ['localhost:9090', '/api']
}
const [ServerHost, ServerProject] = get_server()
export { ServerHost }
export { ServerProject }
/** 后台api请求公共前缀 */
export const ServerBaseurl = `http://${ServerHost}${ServerProject}/`
/** websocket请求前缀 */
export const WsBaseurl = `ws://${ServerHost}/websocket/`

// 设置前端项目存放位置
function get_front() {
    const node = process.env.NODE_ENV
    if (node === 'development') {
        return ''
    }
    return 'project'
}
/** 前端的baseurl */
export const BaseFront = get_front()
