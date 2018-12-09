import './assets/common.css'
import * as React from 'react'
import { Provider } from 'react-redux'
import App from './containers/App'
import { StaticRouter } from 'react-router-dom'
import * as Loadable from 'react-loadable'
import * as ReactDOMServer from 'react-dom/server'
import * as bootstrapper from 'react-async-bootstrapper'
import ReduxSsrThunk from 'redux-ssr-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

export default class SsrMain {

    modules = []
    
    states = undefined

    html = ''
    
    _render(url, store) {
        return (
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <Loadable.Capture report={(moduleName) => this.modules.push(moduleName)}>
                        <App></App>
                    </Loadable.Capture>
                </StaticRouter>
            </Provider>
        )
    }

    async init(ctx) {
        
        const Thunk = new ReduxSsrThunk(true)

        const store = createStore(reducers, applyMiddleware(Thunk.thunk))

        const renderer = this._render(ctx.url, store)
    
        await Loadable.preloadAll()

        await bootstrapper(renderer)

        this.states = await Thunk.execute()

        this.html = ReactDOMServer.renderToString(renderer)
    }
}

