import * as React from 'react'
import { connect } from 'react-redux'
import * as styles from './styles.less'
import { Route, Switch, NavLink } from 'react-router-dom'
import { updateTitle } from '../../reducers/actions'
import * as Loadable from 'react-loadable'

declare var require: {
    <T>(path: string): T

    (paths: string[], callback: (...modules: any[]) => void): void
    
    ensure: (
        paths: string[],
        callback: (require: <T>(path: string) => T) => void
    ) => void
    
    resolveWeak: (paths: string) => any
}

const loading = () => (<div className={styles.loading}> 正在加载…</div>)

const DemoA = Loadable({ 
    loading, 
    loader: () => new Promise(resolve => require.ensure([], (require) => resolve(require('../DemoA')))),
    modules: ['../DemoA'],
    webpack: () => [require.resolveWeak('../DemoA')]
})

const DemoB = Loadable({ 
    loading, 
    loader: () => new Promise(resolve => require.ensure([], (require) => resolve(require('../DemoB')))),
    modules: ['../DemoA'],
    webpack: () => [require.resolveWeak('../DemoA')]
})

const Index = Loadable({ 
    loading, 
    loader: () => new Promise(resolve => require.ensure([], (require) => resolve(require('../Index')))),
    modules: ['../DemoA'],
    webpack: () => [require.resolveWeak('../DemoA')]
})

const mapStateToProps = ({ app }) => {
    return {
        title: app.title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: () => dispatch(updateTitle())
    }
}

interface TitleCompProps {
    title: string
    update: () => void
}
class TitleComp extends React.PureComponent<TitleCompProps, {}> {
    render() {
        return (<h1>{this.props.title}</h1>)
    }
    componentWillMount() {
        this.props.update()
    }
}

const Title = connect(mapStateToProps, mapDispatchToProps)(TitleComp)

class App extends React.Component {
    render() {
        return (
            <div className={styles.box}>
                <Title />
                <ul className={styles.navbox}>
                    <li><NavLink exact activeClassName={styles.active} to='/'>首页</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/demoa'>DEMOA</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/demob'>DEMOB</NavLink></li>
                </ul>
                <div>
                    <Switch>
                        <Route exact path='/' component={Index} />
                        <Route path='/demoa' component={DemoA} />
                        <Route path='/demob' component={DemoB} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App