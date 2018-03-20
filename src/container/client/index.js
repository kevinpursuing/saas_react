import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';


import ReactSwiper from 'reactjs-swiper';

import { getResList } from './redux/app.redux'

import ResPart from './component/ResPart'

const styles = theme => ({
    banner: {
        paddingBottom: 16,
        width: "100%",
        height: 150
    },
    bannerPart: {
        width: "100%",
        height: 150,
        overflow: 'hidden'
    },
    contentPart: {
        width: '100%',
        height: 'auto',
        marginTop: 15
    },
    listBox: {
        padding: 0
    }
});

@connect(
    state => state,
    { getResList }
)
class AppIndex extends Component {

    componentDidMount = () => {

    }

    render() {
        const { classes } = this.props
        const items = [{
            image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci1.jpg',
            title: '图片1',
            link: 'http://jd.com'
        }, {
            image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci2.jpg',
            title: '图片2',
        }, {
            image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci3.jpg',
            title: '图片3',
            link: 'http://jd.com'
        }, {
            image: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
            title: '图片4',
        }];

        const swiperOptions = {
            preloadImages: true,
            autoplay: 4000,
            autoplayDisableOnInteraction: false
        };


        return (
            <div>
                <Paper className={classes.banner} elevation={5}>
                    <ReactSwiper swiperOptions={swiperOptions} showPagination items={items}
                        className={classes.banner} />
                </Paper>
                <Paper className={classes.contentPart} elevation={5}>
                    <List className={classes.listBox}>
                        {this.props.App.resList.map(n => {
                            return (
                                <Link key={n.id} to={"/app/" + this.props.App.appId + "/res/" + n.id}>
                                    <ListItem button key={n.id}>
                                        <ResPart params={n}></ResPart>
                                    </ListItem>
                                    <Divider></Divider>
                                </Link>
                            )
                        })}
                    </List>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(AppIndex);