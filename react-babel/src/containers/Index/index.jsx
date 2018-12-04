import React from 'react'
import { connect } from 'react-redux'
import { updateIData } from '../../reducers/actions'
import styles from './styles.less'
const mapStateToProps = ({ i }, props) => {
    return {
        data: i.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: () => dispatch(updateIData())
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.PureComponent {
    render() {
        const items = this.props.data.map((item, index) => (<li key={index}>{item}</li>))
        return (
            <div>
                <div className={styles.title}>INDEX</div>
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