import { StyleSheet } from 'aphrodite'
import { css } from 'aphrodite/no-important'
import { StyleTheme } from './theme'

class _sc {
    /** 编辑页左上icon菜单栏 */
    child_left_icons(index: number) {
        const OBJ: any = {
            ['child_left_icons' + index]: {
                display: 'flex',
                position: 'absolute',
                left: 10,
                top: 10 + 40 * index,
                width: 40,
                height: 40,
                fontSize: 24,
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                backgroundColor: StyleTheme.style_vars.themeTertiary,
                opacity: 0.3,
                cursor: 'pointer',

                ':hover': {
                    opacity: 1,
                },
            },
        }
        const st: any = StyleSheet.create(OBJ)
        return css(st['child_left_icons' + index])
    }
    get select_item() {
        const obj = {
            item: {
                height: 36,
                lineHeight: '36px',
                borderTop: '1px solid ' + StyleTheme.style_vars.themeTertiary,
                padding: '0 10px',
                fontSize: 14,
                userSelect: 'none',
                backgroundColor: StyleTheme.style_vars.themeLight,
                cursor: 'pointer',
                transition: 'all linear 0.3s',

                ':hover': {
                    backgroundColor: StyleTheme.style_vars.themeTertiary,
                    paddingLeft: 30,
                },
            },
            high: {
                backgroundColor: StyleTheme.style_vars.themeTertiary,
                paddingLeft: 30,
            },
        }
        return StyleSheet.create(obj)
    }
}

export const StyleComp = new _sc()
