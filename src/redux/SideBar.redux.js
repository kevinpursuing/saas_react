const initState = {
    firstPart: "",
    secondPart: "",
    resWords: "",
    type: 0
}

const CHANGE_PART = 'CHANGE_PART'

//reducer
export function SideBar(state = initState, action) {
    switch (action.type) {
        case CHANGE_PART:
            switch (action.secondPart) {
                case 'text':
                    state.resWords = '图文'
                    state.type = 1
                    break
                case 'audio':
                    state.resWords = '音频'
                    state.type = 2
                    break
                case 'video':
                    state.resWords = '视频'
                    state.type = 3
                    break
                default:
                    break
            }
            return { ...state, firstPart: action.firstPart, secondPart: action.secondPart, }
        default:
            return state
    }
}

// 改变侧边栏模块状态
export function changePart(firstPart, secondPart) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_PART',
            firstPart: firstPart,
            secondPart: secondPart
        })
    }

}