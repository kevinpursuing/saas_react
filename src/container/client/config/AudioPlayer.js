import React, { Component } from 'react';
import ReactJkMusicPlayer from "react-jinke-music-player"
class AudioPlayer extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.playInfo)
        let options = {
            /**
             * 音乐列表
             * @param {Array} audioLists 
             * @param {String | ReactNode } audioLists.name  音乐的名字  [ 必填 ]
             * @param {String | ReactNode } audioLists.singer  歌手名  [ 非必填 ]
             * @param {String } audioLists.cover  封面图  [ 必填 ]
             * @param {String } audioLists.musicSrc  音乐链接  [ required ]
            */
            audioLists: [{
                name: this.props.playInfo.name,
                singer: "SaasAudio",
                cover: this.props.playInfo.cover,
                musicSrc: this.props.playInfo.audioSrc
            }],


            //播放器的主题,可选 白天 和 黑夜 两种主题    [ type `string: 'light' or 'drak'  ` default 'drak' ]
            theme: "light",

            //播放器的初始位置 绝对定位 的 top 和left 值   [ type `Object` default '{top:0,left:0}' ]
            defaultPosition: {
                top: '60%',
                left: '40%'
            },

            //播放模式 自定义文字
            playModeText: {
                singleLoop: "单曲循环",
            },

            //默认播放模式 选项 'order' 'orderLoop' 'singleLoop' 'shufflePlay'
            defaultPlayMode: "order",

            //播放器控制器 自定义 打开 文字  [ type `String | ReactNode` default 'open']
            openText: "打开",

            //播放器控制器 自定义 关闭 文字  [ type `String | ReactNode` default 'close']
            closeText: "关闭",

            //播放列表 自定义标题 [ type `String` | ReactNode default 'PlayList' ]
            panelTitle: "播放列表",

            //播放列表没有音乐时的 自定义文字 [ type `String` | ReactNode  default 'no music']
            notContentText: "暂无音乐",

            //播放器主题开关 自定义 选中 文字  [ type `String | ReactNode` default '-']
            checkedText: "开",

            //播放器主题开关 自定义 未选中 文字 [ type `String | ReactNode` default '-']
            unCheckedText: "关",

            //播放器的模式 迷你(mini) 或者 完整 (full) [type `String`  default `mini`]  
            mode: "mini",

            /**
             * [ type `Boolean` default 'false' ]
             * 在默认情况下 'audioPlay' 函数 会在你 每次暂停后再次播放  触发 , 如果 你只想 让 'audioPlay' 在 音乐初始化播放的时候触发一次,你可以设置 为 `true`
             */
            once: false,

            //是否可以 从迷你模式 切换到 完整模式 , 或者 完整模式 切换到 迷你模式 [type `String` default 'true']
            toggleMode: true,

            //在迷你模式时, 是否显示 封面图  [type `Boolean` default 'true']
            showMiniModeCover: true,

            //当播放器是迷你模式时  是否可以对其进行拖拽 [type `String`  default `true`]
            drag: true,

            //播放器控制器的文字 [type `String | ReactNode`  default <FaHeadphones/>]
            controllerTitle: '点击展开',

            //是否显示播放按钮  [type `Boolean` default `true`]
            showPlay: true,

            //是否显示重放按钮  [type `Boolean` default `true`]
            showReload: true,

            //是否显示下载按钮   [type `Boolean` default `true`]
            showDowload: false,

            //是否显示主题切换开关  [type `Boolean` default `true`]
            showThemeSwitch: true,

            //是否显示播放模式 按钮  [type `Boolean` default `treu`]
            showPlayMode: false,

            //如果默认的功能按钮不满足你 你可以自定义扩展      [type 'Array' default '[]' ]
            extendsContent: [],

            //播放器初始音量  [type `Number` default `100` range `0-100`]
            defaultVolume: 100,

            //音频下载 触发 返回 音频信息
            audioDowload(audioInfo) {
                console.log('audio dowload', audioInfo);
            },

            //音频播放触发 返回 音频信息
            audioPlay(audioInfo) {
                console.log('audio playing', audioInfo);
            },

            //音频暂停触发 返回 音频信息
            audioPause(audioInfo) {
                console.log('audio pause', audioInfo);
            },

            //音频拖动 触发函数 返回 音频信息
            audioSeeked(audioInfo) {
                console.log('audio seeked', audioInfo);
            },

            //当前音频结束播放触发 返回音频信息
            audioEnded(audioInfo) {
                console.log('audio ended', audioInfo);
            },

            //音频正在播放中 触发 返回音频信息
            audioProgress(audioInfo) {
                console.log('audio progress', audioInfo);
            },

            //音频加载失败 触发
            loadAudioError(e) {
                console.log('audio load err', e);
            }
        }
        // let audioSrc = this.props.playInfo.audioSrc
        return (
            <ReactJkMusicPlayer {...options} />
        )
    }

}

export default AudioPlayer
