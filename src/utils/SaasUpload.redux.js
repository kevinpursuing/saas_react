import axios from 'axios'

var OSS = require('ali-oss/dist/aliyun-oss-sdk.js')


const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
const UPLOAD_FAILED = 'UPLOAD_FAILED'
const UPLOAD_COVER = 'UPLOAD_COVER'
const UPLOAD_AUDIO = 'UPLOAD_AUDIO'
const UPLOAD_VIDEO = 'UPLOAD_VIDEO'

let initState = {
    updateState: false,
    coverUrl: '',
    audioUrl: '',
    videoUrl: ''
}

export function SaasUpload(state = initState, action) {
    switch (action.type) {
        case UPLOAD_SUCCESS:
            state.updateState = true
            return { ...state }
        case UPLOAD_FAILED:
            state.updateState = false
            return { ...state }
        case UPLOAD_COVER:
            state.coverUrl = action.resUrl
            return { ...state }
        case UPLOAD_AUDIO:
            state.audioUrl = action.resUrl
            return { audioUrl: action.resUrl, ...state }
        case UPLOAD_VIDEO:
            state.videoUrl = action.resUrl
            return { ...state }
        default:
            return state
    }
}

function uploadSuccess() {
    return { type: UPLOAD_SUCCESS }
}

function uploadFailed() {
    return { type: UPLOAD_FAILED }
}

function uploadDate(data, type) {
    switch (type) {
        case 1:
            return { type: UPLOAD_COVER, resUrl: data }
        case 2:
            return { type: UPLOAD_AUDIO, resUrl: data }
        case 3:
            return { type: UPLOAD_VIDEO, resUrl: data }
        default:
            break;
    }
}

export function ossUpload(file, type) {  //type:1,图片 2,音频 3,视频
    let ret
    let storeFile
    var suffix = file.name;
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
        axios.get('/sts')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    ret = res.data.data
                    console.log(ret)
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
                        console.log(result.res.requestUrls[0]);

                        dispatch(uploadDate(result.res.requestUrls[0], type))
                        dispatch(uploadSuccess())

                    }).catch(function (err) {
                        console.log(err);
                        dispatch(uploadFailed())
                    });
                }
            })
    }

}

export function getOssList() {
    let ret
    axios.get('/sts')
        .then(res => {
            if (res.status === 200 && res.data.code === 0) {
                ret = res.data.data
                console.log(ret)
                var client = new OSS({
                    region: 'oss-cn-shenzhen',
                    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                    accessKeyId: ret.AccessKeyId,
                    accessKeySecret: ret.AccessKeySecret,
                    stsToken: ret.SecurityToken,
                    bucket: 'jserk'
                });

                OSS.co(function* () {
                    var result = yield client.list({
                        'max-keys': 10
                    });
                    console.log(result);
                }).catch(function (err) {
                    console.log(err);
                });
            }
        })
}


