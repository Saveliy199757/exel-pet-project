import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE} from '@/store/types';

export function rootReducer(state, action) {
    let prevState
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            prevState = state[field] || {}
            prevState[action.data.id] = action.data.value
            return {...state, [field]: prevState}
        case CHANGE_TEXT:
            prevState = state['cellText'] || {}
            prevState[action.data.id] = action.data.value
            return {...state, currentText: action.data.value, cellText: prevState}
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field]
            action.data.ids.forEach((id) => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        default: return state
    }
}
