// 合并所有reducer 并且返回

import { combineReducers } from 'redux'
import { AppLogin } from './redux/AppLogin.redux'
import { SideBar } from './redux/SideBar.redux'
import { res } from './redux/res.redux'
import { SaasUpload } from './utils/SaasUpload.redux'
import { App } from './container/client/redux/app.redux'

export default combineReducers({ AppLogin, SideBar, res, SaasUpload, App })