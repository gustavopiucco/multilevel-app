import React from "react";
import { Table } from "reactstrap";
import ApiService from '../../../services/api'

class UnilevelTransactions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            transactions: []
        };
    }

    async componentDidMount() {
        this.setState({ isFetching: true });

        const response = await ApiService.get('/transactions/unilevel')
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
                            <th>From Username</th>
                            <th>Plan</th>
                            <th>Amount</th>
                            <th>Level</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.transactions.map((trans, index) => {
                            return (
                                <tr key={index}>
                                    <td>{trans.from}</td>
                                    <td>{trans.plan}</td>
                                    <td>U$ {trans.amount}</td>
                                    <td>{trans.level}</td>
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

export default UnilevelTransactions;
