import './assets/common.css'
import * as React from 'react'
import { render } from 'react-dom'
import reducers from './reducers'
import { Provider } from 'react-redux'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import SsrThunk from 'redux-ssr-thunk'
const Thunk = new SsrThunk()

const store = createStore(reducers, applyMiddleware(Thunk.thunk))

class Main extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        )
    }
}

render(<Main />, document.querySelector('#app'))