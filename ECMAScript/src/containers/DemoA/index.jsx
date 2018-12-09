import React from 'react'
import { connect } from 'react-redux'
import { updateAData } from '../../reducers/actions'
import styles from './styles.less'
const mapStateToProps = ({ a }, props) => {
    return {
        data: a.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: () => dispatch(updateAData())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DemoA extends React.PureComponent {
    render() {
        const items = this.props.data.map((item, index) => (<li key={index}>{item}</li>))
        return (
            <div>
                <div className={styles.title}>DEMOA</div>
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


