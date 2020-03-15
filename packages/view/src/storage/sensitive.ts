import { Base } from './base'
// 敏感词

class Sensitive extends Base<string[]> {
    public get key(): string {
        return 'sensitive'
    }
    parse(s: string | null): string[] {
        try {
            const ss = JSON.parse(s || '[]')
            return ss
        } catch (error) {
            return []
        }
    }
    stringify(v: string[]) {
        return JSON.stringify(v)
    }
}

/** 敏感词 */
export const sensitive_sg = new Sensitive()
