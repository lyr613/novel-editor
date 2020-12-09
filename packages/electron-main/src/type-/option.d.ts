type theme_vo = 'word' | 'excel' | 'ppt'

declare interface option_vo {
    shelf: {
        list: string[]
    }
    ui: {
        theme: theme_vo
    }
}
