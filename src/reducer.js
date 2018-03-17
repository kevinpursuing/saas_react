// 合并所有reducer 并且返回

import { combineReducers } from 'redux'
import { AppLogin } from './redux/AppLogin.redux'
import { SideBar } from './redux/SideBar.redux'

export default combineReducers({ AppLogin,SideBar })