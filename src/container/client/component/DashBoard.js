import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Route, Router
} from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Home from 'material-ui-icons/Home';
import Drafts from 'material-ui-icons/Drafts';
import Person from 'material-ui-icons/Person';

import Index from '../index'
import Message from '../message'
import Info from '../info'
import { changeApp, getResList } from '../redux/app.redux'
const styles = theme => ({
    body: {
        background: '#eeeeee'
    },
    appTab: {
        position: 'fixed',
        bottom: 0,
        width: "100%",
    }
})

@connect(
    state => state,
    { changeApp, getResList }
)
class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appId: 1,
            value: 0,
        }
    }
    componentDidMount = () => {
        let appId = this.props.location.pathname.split("/")[2]
        let dashBoardPart = this.props.location.pathname.split("/")[3]
        switch (dashBoardPart) {
            case 'messages':
                this.setState({ value: 1 })
                break;
            case 'info':
                this.setState({ value: 2 })
                break;
            default:
                break;
        }
        this.props.changeApp(appId)
        this.setState({ appId })
        this.props.getResList(appId)
    }



    handleChange = (event, value) => {
        this.setState({ value });
        switch (value) {
            case 0:
                this.props.history.push("/app/" + this.state.appId)
                break;
            case 1:
                this.props.history.push("/app/" + this.state.appId + "/messages")
                break;
            case 2:
                this.props.history.push("/app/" + this.state.appId + "/info")
                break;
            default:
                break;
        }
    };
    render() {
        const { classes } = this.props
        let appId = this.props.location.pathname.split("/")[2]
        return (
            <div>
                <Route path={"/app/" + appId} exact component={Index}></Route>
                <Route path={"/app/" + appId + "/messages"} exact component={Message}></Route>
                <Route path={"/app/" + appId + "/info"} exact component={Info}></Route>
                <Paper className={classes.appTab}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab icon={<Home />} label="首页" />
                        <Tab icon={<Drafts />} label="消息" />
                        <Tab icon={<Person />} label="我的" />
                    </Tabs>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DashBoard);