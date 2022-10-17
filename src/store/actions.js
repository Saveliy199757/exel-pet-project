import {CHANGE_STYLE, CHANGE_TEXT, TABLE_RESIZE} from '@/store/types';

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}
export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}
export function changeStyles(data) {
    return {
        type: CHANGE_STYLE,
        data
    }
}
