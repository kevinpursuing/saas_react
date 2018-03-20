import React, { Component } from 'react';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Home from 'material-ui-icons/Home';
import { Link } from 'react-router-dom'
import "react-jinke-music-player/assets/index.css"
import "video-react/dist/video-react.css";

import AudioPlayer from './config/AudioPlayer'
import { Player } from 'video-react';
import { getRes, changeResId, changeApp } from './redux/app.redux.js'

const styles = theme => ({
    resCover: {
        width: '100%',
        height: 266
    },
    resVideoCover: {
        width: '100%',
    },
    videoBox: {
        width: '100%',
    },
    resCoverImg: {
        width: '100%',
        height: '100%'
    },
    resInfo: {
        width: '100%',
        height: 'auto',
        boxSizing: 'border-box',
        padding: 20
    },
    title: {
        width: '100%',
        height: 30,
        lineHeight: '30px',
        fontSize: 20,
    },
    intro: {
        width: '100%',
        fontSize: 12,
    },
    buyNum: {
        width: '100%',
        height: 30,
        lineHeight: '30px',
        fontSize: 12,
        color: 'rgba(0,0,0,0.6)'
    },
    buyBox: {
        position: 'fixed',
        width: '100%',
        height: 70,
        bottom: 0
    },
    buyBtn: {
        position: 'absolute',
        width: '60%',
        height: 50,
        top: '50%',
        left: '50%',
        marginLeft: '-30%',
        marginTop: -25
    },
    returnIndexBtn: {
        position: 'absolute',
        right: 5,
        bottom: 80
    }

});
@connect(
    state => state,
    { getRes, changeApp, changeResId }
)
class Res extends Component {

    componentDidMount = () => {
        let appId = this.props.location.pathname.split("/")[2]
        let resId = this.props.location.pathname.split("/")[4]
        this.props.changeApp(appId)
        this.props.changeResId(resId)
        this.props.getRes(appId, resId)
    }

    render() {
        let { classes, App } = this.props

        return (

            <div className={classes.resPart} >

                {App.res.videoSrc === '' ?
                    <Paper className={classes.resCover} elevation={5}>
                        <img className={classes.resCoverImg} src={App.res.cover} alt="" />
                    </Paper>
                    :
                    <Paper className={classes.resVideoCover} elevation={5}>
                        <Player classesName={classes.videoBox}>
                            <source src={App.res.videoSrc} />
                        </Player>
                    </Paper>
                }

                <div className={classes.resInfo}>
                    <Typography className={classes.title}>{App.res.name}</Typography>
                    <Typography className={classes.intro}>{App.res.intro}</Typography>
                    <Typography className={classes.buyNum}>100人订阅</Typography>
                    <Divider />
                    <Typography className={classes.buyNum}>本内容需要付费后才能阅读全文</Typography>
                    {App.res.audioSrc === '' ? null : console.log(App.res.audioSrc)}
                    {App.res.audioSrc === '' ? null : <AudioPlayer playInfo={App.res}></AudioPlayer>}

                </div>
                <Paper className={classes.buyBox} elevation={3}>
                    <Button className={classes.buyBtn} variant="raised" size="large" color="primary" >购买：￥{App.res.price}</Button>
                </Paper>
                {this.props.App.appId === "" ? null : <Link to={"/app/" + this.props.App.appId}>
                    <Button variant="fab" aria-label="add" className={classes.returnIndexBtn}>
                        <Home />
                    </Button>
                </Link>}


            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Res);