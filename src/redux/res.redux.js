// 用于3类资源的状态管理
import axios from 'axios'
import { timeConvert, getNowFormatDate } from '../utils/utils'

var OSS = require('ali-oss/dist/aliyun-oss-sdk.js')

const CREATE_RES = 'CREATE_RES'
const EDIT_RES = 'EDIT_RES'
const DELET_RES = 'DELET_RES'
const EMPTY_RES = 'EMPTY_RES'
const RES_LIST = 'RES_LIST'
const RES_INFO = 'RES_INFO'
const CHANGE_INFO = 'CHANGE_INFO'

let initState = {
    resList: [],
    resDetail: {},
    isShowBox: false,
    id: '',
    name: '',  //资源名称
    intro: '',  //资源简介
    cover: '',  //资源封面
    textContent: '',  //图文内容
    saleType: 0,  //售卖类型
    audioSrc: '',  //音频资源地址
    videoSrc: '',  //视频资源地址
    price: 0,  //资源价格
    saleTime: getNowFormatDate(),   //上架时间
}

export function res(state = initState, action) {
    switch (action.type) {
        case CHANGE_INFO:
            return { ...state, ...action.payload }
        case CREATE_RES:
            return state
        case EDIT_RES:
            return { resList: [], resDetail: action.payload }
        case EMPTY_RES:
            return { ...initState }
        case DELET_RES:
            return { ...state, resList: [], resDetail: action.payload }
        case RES_LIST:
            return { ...state, resList: action.payload, resDetail: {} }
        case RES_INFO:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

function resList(list) {
    return { type: RES_LIST, payload: list }
}

function resInfo(data) {
    return { type: RES_INFO, payload: data }
}

function emptyRes(data) {
    return { type: EMPTY_RES }
}
export function handleChange(key, value) {
    value = value.target.value
    return (dispatch) => {
        dispatch({
            type: CHANGE_INFO, payload: { [key]: value }
        })
    }
}

export function ossUpload(file, type) {  //type:1,图片 2,音频 3,视频
    let ret
    let storeFile
    var suffix = file.name;
    console.log(`type:${type}`)
    switch (type) {
        case 1:
            storeFile = 'saas_pic'
            break;
        case 2:
            storeFile = 'saas_audio'
            break;
        case 3:
            storeFile = 'saas_video'
            break;
        default:
            storeFile = 'saas_files'
            break;
    }

    var storeAs = storeFile + "/" + suffix;  //命名空间
    console.log(file.name + ' => ' + storeAs);
    return (dispatch) => {
        axios.get('/api/sts')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    ret = res.data.data
                    var client = new OSS({
                        region: 'oss-cn-shenzhen',
                        //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                        accessKeyId: ret.AccessKeyId,
                        accessKeySecret: ret.AccessKeySecret,
                        stsToken: ret.SecurityToken,
                        bucket: 'jserk'
                    });

                    OSS.co(function* () {
                        var result = yield client.multipartUpload(storeAs, file)
                        let data = result.res.requestUrls[0].split('?')[0]
                        switch (type) {
                            case 1:
                                dispatch({
                                    type: CHANGE_INFO, payload: { cover: data }
                                })
                                break
                            case 2:
                                dispatch({
                                    type: CHANGE_INFO, payload: { audioSrc: data }
                                })
                                break
                            case 3:
                                dispatch({
                                    type: CHANGE_INFO, payload: { videoSrc: data }
                                })
                                break
                            default:
                                break;
                        }

                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            })
    }

}

// 创建/编辑资源
export function ceRes(data, type, history, secondPart) {
    let { resList, resDetail, ...params } = data
    return (dispatch) => {
        axios.post('/api/cms/createRes', { type: type, ...params })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(emptyRes())
                    history.push('/cms/content/' + secondPart)
                } else {
                }
            })
    }
}

export function getResInfo(resId, type) {
    return (dispatch) => {
        axios.get("/api/cms/getResInfo?id=" + resId)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data.data)
                    res.data.data.saleTime = timeConvert(res.data.data.saleTime)
                    dispatch(resInfo(res.data.data))
                }
            })
    }
}

export function getResList(type) {
    return (dispatch) => {
        axios.get('/api/cms/getResList?type=' + type)
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(resList(res.data.data))
                }
            })
    }
}