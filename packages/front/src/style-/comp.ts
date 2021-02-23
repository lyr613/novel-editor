import { StyleSheet } from 'aphrodite'
import { css } from 'aphrodite/no-important'
import { themes } from './theme'

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
                backgroundColor: themes.style_vars.themeTertiary,
                opacity: 0.3,
                ':hover': {
                    opacity: 1,
                },
            },
        }
        const st: any = StyleSheet.create(OBJ)
        return css(st['child_left_icons' + index])
    }
}

export const StyleComp = new _sc()
