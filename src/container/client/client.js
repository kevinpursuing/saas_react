import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Route,
    Switch
} from 'react-router-dom'

import { withStyles } from 'material-ui/styles';

import Res from './res'
import Dashboard from './component/DashBoard'
import { changeApp, getResList } from './redux/app.redux'
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
class Client extends Component {
    render() {
        let appId = this.props.location.pathname.split("/")[2]
        return (
            <div>
                <Switch>
                    <Route path={"/app/" + appId + "/res/:resId"} exact component={Res}></Route>
                    <Route path={"/app/" + appId + "/"} component={Dashboard}></Route>
                </Switch>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Client);