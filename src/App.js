import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import { createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk' //action异步中间件
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import reducer from './reducer'

import Login from './container/login/login'
import Register from './container/register/register'
import cmsIndex from './container/cms/cms'
import Test from './test/test'

import './index.css'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1a9f9f' },
  },
});

const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : () => { }
))

class App extends Component {
  render() {
    return (

      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Provider store={store}>
            <BrowserRouter>
              <div>
                <Switch>
                  <Route exact path='/' component={Login}></Route>
                  <Route path='/register' component={Register}></Route>
                  <Route path='/cms' component={cmsIndex}></Route>
                  <Route path='/test' component={Test}></Route>
                </Switch>
              </div>
            </BrowserRouter>
          </Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
