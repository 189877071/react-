import * as React from 'react'
import { connect } from 'react-redux'
import { updateBData } from '../../reducers/actions'
import * as styles from './styles.less'

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

interface Props {
    data: any[]
    update: () => void
}
class DemoB extends React.PureComponent<Props, {}> {
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

export default connect(mapStateToProps, mapDispatchToProps)(DemoB)