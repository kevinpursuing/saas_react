import axios from 'axios'

const CHANGE_APP = 'CHANGE_APP'
const CHANGE_RES = 'CHANGE_RES'
const CHANGE_RES_ID = 'CHANGE_RES_ID'
const RESOURCE_LIST = 'RESOURCE_LIST'

let initState = {
    appId: '',
    resId: '',
    resList: [],
    res: {
        name: '',  //资源名称
        intro: '',  //资源简介
        cover: '',  //资源封面
        textContent: '',  //图文内容
        saleType: 0,  //售卖类型
        audioSrc: '',  //音频资源地址
        videoSrc: '',  //视频资源地址
        price: 0,  //资源价格
    }
}
export function App(state = initState, action) {
    switch (action.type) {
        case CHANGE_APP:
            return { ...state, ...action.payload }
        case CHANGE_RES_ID:
            return { ...state, ...action.payload }
        case CHANGE_RES:
            return { ...state, res: action.payload }
        case RESOURCE_LIST:
            return { ...state, res: initState.res, resList: action.payload }
        default:
            return state
    }
}

export function changeApp(appId) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_APP,
            payload: { appId: appId }
        })
    }
}

export function changeResId(resId) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_RES_ID,
            payload: { resId: resId }
        })
    }
}


function resList(list) {
    return { type: RESOURCE_LIST, payload: list }
}

function resource(data) {
    return { type: CHANGE_RES, payload: data }
}


export function getResList(appId) {
    return (dispatch) => {
        axios.get('/api/client/getResList?appId=' + appId)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(resList(res.data.data))
                }
            })
    }
}

export function getRes(appId, resId) {
    return (dispatch) => {
        axios.get('/api/client/getRes?appId=' + appId + '&&id=' + resId)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(resource(res.data.data))
                }
            })
    }
}
