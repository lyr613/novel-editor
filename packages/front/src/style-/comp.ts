import { StyleSheet } from 'aphrodite'
import { css } from 'aphrodite/no-important'
import { themes } from './theme'

interface style_vo {
    /** 组件顶层 */
    volume: object
    ListShow: object
}

class _sc {
    /** 编辑页左上icon菜单栏 */
    child_left_icons(index: number) {
        const OBJ: any = {}
        for (let i = 0; i < 12; i++) {
            OBJ['child_left_icons' + i] = {
                display: 'flex',
                position: 'absolute',
                left: 10,
                top: 10 + 40 * i,
                width: 40,
                height: 40,
                fontSize: 24,
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                backgroundColor: themes.style_vars.themeTertiary,
            }
        }
        const st: any = StyleSheet.create(OBJ)
        return css(st['child_left_icons' + index])
    }
}

export const StyleComp = new _sc()
