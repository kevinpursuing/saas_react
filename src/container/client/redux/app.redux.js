import axios from 'axios'

const CHANGE_APP = 'CHANGE_APP'

let initState = {
    appId: ''
}
export function App(state = initState, action) {
    switch (action.type) {
        case CHANGE_APP:
            console.log(1)
            return { ...action.payload }
        default:
            return state
    }
}

export function changeApp(appId) {
    console.log(appId)
    return (dispatch) => {
        dispatch({
            type: CHANGE_APP,
            payload: { appId: appId }
        })
    }
}