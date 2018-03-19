import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Route
} from 'react-router-dom'

import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

import Index from './index'
import Message from './message'
import Info from './info'
import { changeApp } from './redux/app.redux'
const styles = theme => ({})

@connect(
    state => state,
    {}
)
class AppIndex extends Component {

    componentDidMount = () => {
    }

    render() {
        return (
            <div>
                这是个人信息页
            </div>
        )
    }
}

export default AppIndex