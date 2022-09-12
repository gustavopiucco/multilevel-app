import React from "react"
import { Row } from 'reactstrap'
import ApiService from '../../services/api'
import Plan from '../../components/dashboard/plan/plan'
import planBT100 from '../../assets/images/plans/plan_bt100.png'
import planBT300 from '../../assets/images/plans/plan_bt500.png'
import planBT500 from '../../assets/images/plans/plan_bt1000.png'
import planBT2500 from '../../assets/images/plans/plan_bt2500.png'
import planBT5000 from '../../assets/images/plans/plan_bt5000.png'
import planBT12500 from '../../assets/images/plans/plan_bt12500.png'
import planBT25000 from '../../assets/images/plans/plan_bt25000.png'
import planBT50000 from '../../assets/images/plans/plan_bt50000.png'
import { Translate } from 'react-i18nify'

class Plans extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isFetching: false
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/user')

        if (response.ok) {
            const json = await response.json()
            this.setState({ user: json.data })
        }

        this.setState({ isFetching: false })
    }

    render() {
        if (!this.state.user)
            return ''

        return (
            <React.Fragment>
                <h4><Translate value="dashboard.plans.title" /></h4>
                <Row>
                    <Plan user={this.state.user} id={1} name="BT-100" price="100.00" bots="1" img={planBT100} />
                    <Plan user={this.state.user} id={2} name="BT-500" price="500.00" bots="5" img={planBT300} />
                    <Plan user={this.state.user} id={3} name="BT-1000" price="1000.00" bots="10" img={planBT500} />
                    <Plan user={this.state.user} id={4} name="BT-2500" price="2500.00" bots="25" img={planBT2500} />
                    <Plan user={this.state.user} id={5} name="BT-5000" price="5000.00" bots="50" img={planBT5000} />
                    <Plan user={this.state.user} id={6} name="BT-12500" price="12500.00" bots="125" img={planBT12500} />
                    <Plan user={this.state.user} id={7} name="BT-25000" price="25000.00" bots="250" img={planBT25000} />
                    <Plan user={this.state.user} id={8} name="BT-50000" price="50000.00" bots="500" img={planBT50000} />
                </Row>
            </React.Fragment>
        )
    }
}

export default Plans