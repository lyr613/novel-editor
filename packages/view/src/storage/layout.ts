import { Base } from './base'

interface layout {
    width: number
    height: number
}
class LayoutOutline extends Base<layout> {
    public get key(): string {
        return 'opt-layout-outline'
    }
    parse(s: string | null): layout {
        try {
            const jn = JSON.parse(s || '')
            return {
                width: jn.width,
                height: jn.height,
            }
        } catch (error) {
            return {
                width: 200,
                height: 200,
            }
        }
    }
    stringify(v: any) {
        return JSON.stringify(v)
    }
}
class LayoutEditer extends Base<layout> {
    public get key(): string {
        return 'opt-layout-editer'
    }
    parse(s: string | null): layout {
        try {
            const jn = JSON.parse(s || '')
            return {
                width: jn.width,
                height: jn.height,
            }
        } catch (error) {
            return {
                width: 100,
                height: 100,
            }
        }
    }
    stringify(v: any) {
        return JSON.stringify(v)
    }
}

/** 编辑器位置偏移, 像素, 设置的时候限制x +-300, y +-200 */
class TransformEditer extends Base<layout> {
    public get key(): string {
        return 'opt-transform-editer'
    }
    parse(s: string | null): layout {
        try {
            const jn = JSON.parse(s || '')
            return {
                width: jn.width,
                height: jn.height,
            }
        } catch (error) {
            return {
                width: 0,
                height: 0,
            }
        }
    }
    stringify(v: any) {
        return JSON.stringify(v)
    }
}

/**
 * 设置编辑页 - 大纲
 */
export const layout_outline_sg = new LayoutOutline()
/**
 * 设置编辑页 - 编辑窗口
 */
export const layout_editer_sg = new LayoutEditer()
