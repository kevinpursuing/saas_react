const initState = {
    firstPart: "",
    secondPart: ""
}

const CHANGE_PART = 'CHANGE_PART'

//reducer
export function SideBar(state = initState, action) {
    switch (action.type) {
        case CHANGE_PART:
            return { firstPart: action.firstPart, secondPart: action.secondPart }
        default:
            return state
    }
}

// 改变侧边栏模块状态
export function changePart(firstPart, secondPart) {
    console.log(firstPart, secondPart)
    return dispatch => {
        dispatch({
            type: 'CHANGE_PART',
            firstPart: firstPart,
            secondPart: secondPart
        })
    }

}