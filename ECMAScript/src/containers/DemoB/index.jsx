import React from 'react'
import { connect } from 'react-redux'
import { updateBData } from '../../reducers/actions'
import styles from './styles.less'
const mapStateToProps = ({ b }, props) => {
    return {
        data: b.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: () => dispatch(updateBData())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DemoB extends React.PureComponent {
    render() {
        const items = this.props.data.map((item, index) => (<li key={index}>{item}</li>))
        return (
            <div>
                <div className={styles.title}>DEMOB</div>
                <ul className={styles.listbox}>
                    {items}
                </ul>
            </div>
        )
    }
    componentWillMount() {
        this.props.update()
    }
}