import React, { Component } from 'react'
import axios from 'axios'
import Button from 'material-ui/Button';

class Test extends Component {
    handleClick = () => {
        axios.post('/app/login', { phone: '123', pwd: '123' })
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
    render() {
        return (
            <div>
                <Button variant="raised" color="primary" onClick={this.handleClick}>
                    登录
                </Button>
            </div>
        )
    }
}

export default Test