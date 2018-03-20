import React, { Component } from 'react';
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

const styles = theme => ({
    resPart: {
        position: 'relative',
        width: '100%',
        height: 70
    },
    resCover: {
        float: 'left',
        width: 100,
        height: 70,
        background: 'grey',
        marginRight: 10
    },
    resCoverImage: {
        width: '100%',
        height: '100%'
    },
    resName: {
        height: 30,
        fontSize: 15,
        lineHeight: "30px"
    },
    resIntro: {
        height: 20,
        fontSize: 12,
        lineHeight: "20px",
        marginBottom: 10,
        color: 'rgba(0,0,0,0.5)'
    },
    buyNum: {
        height: 20,
        fontSize: 12,
        lineHeight: "20px",
        color: 'rgba(0,0,0,0.5)'
    },
    price: {
        position: 'absolute',
        fontSize: 12,
        color: 'red',
        bottom: 0,
        right: 0
    }
});
@connect(
    state => state,
)
class ResPart extends Component {

    componentDidMount = () => {
    }

    render() {
        const { classes, params } = this.props
        return (
            <div className={classes.resPart} >
                <Paper className={classes.resCover} elevation={0}>
                    {params.cover === "" ? null : <img className={classes.resCoverImage} src={params.cover} />}
                </Paper>
                <Typography className={classes.resTitle}>{params.name}</Typography>
                <Typography className={classes.resIntro}>{params.intro}</Typography>
                <Typography className={classes.buyNum}>0人开通</Typography>
                <Typography className={classes.price}>￥{params.price}</Typography>
            </div>
        )
    }
}


export default withStyles(styles, { withTheme: true })(ResPart);