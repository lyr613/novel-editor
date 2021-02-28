class _o {
    /** 系统类型, 只做win, 其他都当做mac */
    platform() {
        const agent = navigator.userAgent.toLowerCase()
        if (agent.includes('win')) {
            return 'win'
        }
        return 'mac'
    }
}

export const ToolOs = new _o()
