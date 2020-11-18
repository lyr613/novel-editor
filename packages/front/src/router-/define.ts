export type router1_vo = 'shelf' | 'edit' | 'option'

interface rt<t> {
    en: t
    cn: string
}

export function router1(): { [k in router1_vo]: rt<k> } {
    return {
        shelf: {
            en: 'shelf',
            cn: '书架',
        },
        edit: {
            en: 'edit',
            cn: '编辑',
        },
        option: {
            en: 'option',
            cn: '设置',
        },
    }
}

// 书架2级
export type router2_shelf_vo = 'show' | 'new'
export function router2_shelf(): { [k in router2_shelf_vo]: rt<k> } {
    return {
        show: {
            en: 'show',
            cn: '查看',
        },
        new: {
            en: 'new',
            cn: '查看',
        },
    }
}

// 设置2级
export type router2_option_vo = 'edit' | 'ui' | 'remind'
export function router2_option(): { [k in router2_option_vo]: rt<k> } {
    return {
        edit: {
            en: 'edit',
            cn: '编辑',
        },
        ui: {
            en: 'ui',
            cn: '显示',
        },
        remind: {
            en: 'remind',
            cn: '提醒',
        },
    }
}
