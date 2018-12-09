import * as React from 'react'
import { connect } from 'react-redux'
import { updateAData } from '../../reducers/actions'
import * as styles from './styles.less'
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

interface Props {
    data: any[]
    update: () => void
}
class DemoA extends React.PureComponent<Props, {}> {
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

export default connect(mapStateToProps, mapDispatchToProps)(DemoA)

