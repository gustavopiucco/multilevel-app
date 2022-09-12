import React from "react"
import { Table } from "reactstrap"
import ApiService from '../../../services/api'

class BinaryTransactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            transactions: []
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true });

        const response = await ApiService.get('/transactions/binary')
        let json = []

        if (response.ok) {
            json = await response.json()
        }

        this.setState({ transactions: json.data, isFetching: false })
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
                            <th>Amount</th>
                            <th>Binary Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((trans, index) => {
                            return (
                                <tr key={index}>
                                    <td>U$ {trans.amount_paid}</td>
                                    <td>{trans.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )
        }
    }
}

export default BinaryTransactions;
