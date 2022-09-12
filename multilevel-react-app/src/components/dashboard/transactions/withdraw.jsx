import React from "react"
import { Table, Badge } from "reactstrap"
import ApiService from '../../../services/api'

class WithdrawTransactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            transactions: []
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true });

        const response = await ApiService.get('/transactions/withdraw')
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
                            <th>BTC Address</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>TX ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((trans, index) => {
                            return (
                                <tr key={index}>
                                    <td>{trans.btc_address}</td>
                                    <td>{(trans.withdraw_type === 'balance') ? 'Balance' : 'Network Balance'}</td>
                                    <td>U$ {trans.amount}</td>
                                    <td>{trans.paid ? <Badge color="success">Payment Confirmed</Badge> : <Badge color="info">Payment in Progress</Badge>}</td>
                                    <td>{trans.tx_id}</td>
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

export default WithdrawTransactions;
