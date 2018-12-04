import './assets/common.css'
import React from 'react'
import { hydrate } from 'react-dom'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
import { createStore, applyMiddleware } from 'redux'
import ReduxSsrThunk from 'redux-ssr-thunk'

const Thunk = new ReduxSsrThunk()

const store = createStore(reducers, window.__INITIAL_STATE__, applyMiddleware(Thunk.thunk))

// 打包代码 浏览器执行代码
class Main extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )
    }
}

Loadable.preloadReady().then(() => hydrate(<Main />, document.querySelector('#app')))