export const system = get_sys()

function get_sys() {
    const agent = navigator.userAgent.toLowerCase()
    if (/mac/.test(agent)) {
        return 'mac'
    }
    return 'win'
}
