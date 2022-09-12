import React from "react"
import { Table } from "reactstrap"
import ApiService from '../../../services/api'

class CareerPlanTransactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            transactions: []
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/transactions/careerplan')
        let json = []

        if (response.ok) {
            json = await response.json()
        }

        this.setState({ transactions: json.data, isFetching: false })
    }

    getNamebyCode(careerPlanId) {
        switch (careerPlanId) {
            case 1:
                return 'Bronze'
            case 2:
                return 'Silver'
            case 3:
                return 'Gold'
            case 4:
                return 'Ruby'
            case 5:
                return 'Emerald'
            case 6:
                return 'Diamond'
            case 7:
                return 'Double Diamond'
            case 8:
                return 'Triple Diamond'
            case 9:
                return 'Black Diamond'
            default:
                return null
        }
    }

    render() {
        if (this.state.isFetching) {
            return <h5 className="text-center">Loading...</h5>
        }
        else if (this.state.transactions.length === 0) {
            return <h5 className="text-center">No transactions to show.</h5>
        }
        else {
            return (
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Prize</th>
                            <th>Points Needed</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((trans, index) => {
                            return (
                                <tr key={index}>
                                    <td>{this.getNamebyCode(trans.career_plan)}</td>
                                    <td>U$ {trans.prize}</td>
                                    <td>{trans.points_needed}</td>
                                    <td>{new Date(trans.date).toUTCString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }
    }
}

export default CareerPlanTransactions
