import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.less'
import { Route, Switch, NavLink } from 'react-router-dom'
import { updateTitle } from '../../reducers/actions'
import Loadable from 'react-loadable'

class Loading extends React.Component {
    render() {
        return (
            <div className={styles.loading}> 正在加载…</div>
        )
    }
}

const DemoA = Loadable({ loading: Loading, loader: () => import('../DemoA') })
const DemoB = Loadable({ loading: Loading, loader: () => import('../DemoB') })
const Index = Loadable({ loading: Loading, loader: () => import('../Index') })

// import DemoA from '../DemoA'
// import DemoB from '../DemoB'
// import Index from '../Index'

const mapStateToProps = ({ app }, props) => {
    return {
        title: app.title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: () => dispatch(updateTitle())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Title extends React.PureComponent {
    render() {
        return (<h1>{this.props.title}</h1>)
    }
    componentWillMount() {
        this.props.update()
    }
}

class App extends Component {
    render() {
        return (
            <div className={styles.box}>
                <Title />
                <ul className={styles.navbox}>
                    <li><NavLink exact activeClassName={styles.active} to='/'>首页</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/demoa'>DEMOA</NavLink></li>
                    <li><NavLink activeClassName={styles.active} to='/demob'>DEMOB</NavLink></li>
                </ul>
                <div className={styles.connect}>
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