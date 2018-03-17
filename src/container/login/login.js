import React, { Component } from 'react';
import axios from 'axios'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form'

const styles = {
    registerHref: {
        cursor: 'pointer',
    }
}
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            pwd: '',
            phoneTips: '',
            pwdTips: ''
        }
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val.target.value
        })
    }

    verifyPhone = () => {
        if (this.state.phone === '') {
            this.setState({
                phoneTips: '请填入账号'
            })
        } else {
            this.setState({
                phoneTips: ''
            })
        }
    }

    verifyPwd = () => {
        if (this.state.pwd === '') {
            this.setState({
                pwdTips: '请填入密码'
            })
        } else {
            this.setState({
                pwdTips: ''
            })
        }
    }

    login = () => {
        let { phone, pwd } = this.state
        console.log(phone, pwd)
        if (this.state.pwdTips === '' && this.state.phoneTips === '') {
            axios.post('/app/login', { phone: phone, pwd: pwd })
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.props.history.push('/cms')
                    } else if (res.status === 200 && res.data.code === 1) {
                        this.setState({
                            phoneTips: res.data.msg,
                            pwdTips: res.data.msg
                        })
                    }
                })
        }
    }

    goRegister = () => {

        // this.props.history.push('/register')
    }

    render() {
        return (
            <div className="App">
                <div className="logoBox">
                    <img src={require('../../pic/logo.png')} alt="logo" />
                </div>
                <Paper className="loginBox">
                    <div className='headerWords'>登录</div>
                    <div className="loginInput">
                        <TextField
                            error={this.state.phoneTips === '' ? false : true}
                            id="phone"
                            label="手机号"
                            margin="normal"
                            type='number'
                            onBlur={this.verifyPhone}
                            onChange={v => this.handleChange('phone', v)}
                        />
                        {this.state.phoneTips ? <FormHelperText id="name-help-text" className="red">{this.state.phoneTips}</FormHelperText> : null}
                        <TextField
                            error={this.state.pwdTips === '' ? false : true}
                            id="pwd"
                            label="密码"
                            type="password"
                            margin="normal"
                            onBlur={this.verifyPwd}
                            onChange={v => this.handleChange('pwd', v)}
                        />
                        {this.state.pwdTips ? <FormHelperText id="name-help-text" className="red">{this.state.pwdTips}</FormHelperText> : null}
                        <Button variant="raised" color="primary" onClick={this.login}>
                            登录
                        </Button>
                        <div>
                            {/* <div className='footerWords left'>忘记密码？</div> */}
                            <div className='footerWords right'>还没有账号？<span onClick={this.goRegister} style={styles.registerHref}>立即注册</span></div>
                        </div>
                    </div>

                </Paper>
            </div>
        );
    }
}

export default Login;