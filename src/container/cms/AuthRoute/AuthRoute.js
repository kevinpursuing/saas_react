import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../../redux/AppLogin.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
    null,
    { loadData }
)
class AuthRoute extends React.Component {
    componentDidMount = () => {
        // const publicList = ['/login', '/register']
        // const pathname = this.props.location.pathname
        // if (publicList.indexOf(pathname) > -1) {
        //     return null
        // }
        //  获取用户信息
        axios.get('/api/app/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        // 有登陆信息的
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
        // 是否登录 
        // 现在url地址 
        // login需不需要跳转 
        // 用户的type 身份是boss还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }
    render() {
        return null
    }
}

export default AuthRoute