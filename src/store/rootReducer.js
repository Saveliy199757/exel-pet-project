export function rootReducer(state, action) {
    let prevState
    switch (action.type) {
        case 'COL_RESIZE':
            console.log()
            prevState = state.colState || {}
            prevState[action.data.id] = action.data.width
            return {...state, colState: prevState}
        default: return state
    }
}
