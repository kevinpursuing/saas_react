import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import ReactSwiper from 'reactjs-swiper';

const styles = theme => ({
    banner: {
        paddingBottom: 16,
        width: "100%",
        height: 200
    },
    bannerPart: {
        width: "100%",
        height: 200,
        overflow:'hidden'
    }
});

@connect(
    state => state,
    {}
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
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(AppIndex);