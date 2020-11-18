import { StyleSheet } from 'aphrodite'
import { THEMECOLOR } from 'style-/global'

interface style_vo {
    LabelBar: object
    LabelItem: object
    LabelItemUse: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    LabelBar: {
        display: 'flex',
        width: '100%',
        height: 30,
        // border: '1px solid ' + THEMECOLOR.word.l2,
        backgroundColor: THEMECOLOR.word.l1,
    },
    LabelItem: {
        height: 30,
        lineHeight: '30px',
        padding: ' 0 36px',
        fontSize: 14,
        color: 'white',
        borderRight: '1px solid ' + THEMECOLOR.word.l1,
        backgroundColor: THEMECOLOR.word.l3,
        cursor: 'pointer',
        userSelect: 'none',
        ':hover span': {
            color: 'red',
        },
    },
    LabelItemUse: {
        backgroundColor: THEMECOLOR.word.l2,
    },
})
