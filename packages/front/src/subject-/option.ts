import { BehaviorSubject } from 'rxjs'

export const option$ = new BehaviorSubject(null)

function formatter_option(old: option_vo | null) {
    const opt = default_option()
    // ui.theme
    opt.ui.theme = old?.ui?.theme ?? 'word'
    if (!['word', 'excel', 'ppt'].includes(opt.ui.theme)) {
        opt.ui.theme = 'word'
    }
}

export function default_option(): option_vo {
    return {
        ui: {
            /** 主题 */
            theme: 'word',
        },
    }
}
