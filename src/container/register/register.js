import React, { Component } from 'react';
import axios from 'axios'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button';
import { FormHelperText } from 'material-ui/Form'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';

import './register.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            pwd: '',
            confirmPwd: '',
            phoneTips: '',
            pwdTips: '',
            confirmPwdTips: '',
            allowRegister: false,
            alertBoxOpen: false,
            registerSuccess: false
        }
    }

    proveParams = () => {
        console.log(this.state);
        let { phone, pwd, confirmPwd } = this.state

        if (phone === "") {
            this.setState({ phoneTips: '请设置手机号' })
        } else {
            this.setState({ phoneTips: '' })
        }
        if (pwd === '') {
            this.setState({ pwdTips: '请输入密码' })
        } else {
            this.setState({ pwdTips: '' })
        }
        if (confirmPwd !== pwd) {
            this.setState({ confirmPwdTips: '确认密码与原密码不同，请重新输入' })
        } else {
            this.setState({ confirmPwdTips: '' })
        }

        if (this.state.confirmPwdTips === '' && this.state.pwdTips === '' && this.state.pwdTips === '') {
            this.setState({ allowRegister: true })
        }

    }
    handleChange = (key, val) => {
        this.setState({
            [key]: val.target.value
        })
        this.proveParams()
    }
    register = () => {
        let { phone, pwd } = this.state
        if (this.state.allowRegister === true) {
            axios.post('/api/app/register', { phone: phone, pwd: pwd })
                .then(res => {
                    if (res.status === 200 && res.data.code === 0) {
                        this.setState({ alertBoxOpen: true, registerSuccess: true })
                    } else if (res.status === 200 && res.data.code === 2) {
                        this.setState({ phoneTips: '手机号已被注册' })
                    } else {
                        this.setState({ alertBoxOpen: true, registerSuccess: false })
                    }
                })
        }
    }

    render() {
        return (
            <div className="App">
                <div className="logoBox">
                    <img src={require('../../pic/logo.png')} alt="logo" />
                </div>
                <Paper className="registerBox">
                    <div className='headerWords'>注册</div>
                    <div className="loginInput">
                        <div>
                            <TextField
                                id="phone"
                                label="手机号"
                                type="number"
                                className="phoneInput"
                                margin="normal"
                                onBlur={this.proveParams}
                                onChange={v => this.handleChange('phone', v)}
                            />

                            <Button variant="raised" className="phoneButton">
                                获取验证码
                            </Button>
                            <FormHelperText id="name-error-text" className="red">{this.state.phoneTips}</FormHelperText>
                        </div>

                        <TextField
                            id="pwd"
                            label="密码"
                            type="password"
                            margin="normal"
                            onBlur={this.proveParams}
                            onChange={v => this.handleChange('pwd', v)}
                        />
                        <FormHelperText id="name-error-text" className="red">{this.state.pwdTips}</FormHelperText>
                        <TextField
                            id="repeatPwd"
                            label="确认密码"
                            type="password"
                            margin="normal"
                            onBlur={this.proveParams}
                            onChange={v => this.handleChange('confirmPwd', v)}
                        />
                        <FormHelperText id="name-error-text" className="red">{this.state.confirmPwdTips}</FormHelperText>
                        <Button variant="raised" color="primary" onClick={this.register}>
                            立即注册
                        </Button>
                        <div>
                            <div className='footerWords left'>忘记密码？</div>
                            <div className='footerWords right'>已有账号？<span className="blue">立即登录</span></div>
                        </div>
                    </div>

                </Paper>
                <Dialog
                    open={this.state.alertBoxOpen}
                    onClose={() => this.setState({ alertBoxOpen: false })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.registerSuccess ? '恭喜您注册成功！' : '注册失败'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {this.state.registerSuccess ? <Button onClick={() => this.props.history.push('/login')} color="primary">
                            去登录
                        </Button> : null}
                        <Button onClick={() => this.setState({ alertBoxOpen: false })} color="primary" autoFocus>
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Login;