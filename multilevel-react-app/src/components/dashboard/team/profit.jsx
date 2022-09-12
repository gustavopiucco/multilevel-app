import React from "react";
import { Table, Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class Profit extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doTeamProfit = this.doTeamProfit.bind(this)

        this.state = {
            fromDate: '',
            toDate: '',
            data: [],
            totalBtcPrice: 0,
            totalProfit: 0,
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doTeamProfit(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.get('/admin/teamprofit/?fromDate=' + this.state.fromDate + '&toDate=' + this.state.toDate)
        const json = await response.json()

        if (response.ok) {
            this.setState({ data: json.data, totalBtcPrice: json.totalBtcPrice, totalProfit: json.totalProfit, error: null, success: true })
        }
        else {
            this.setState({ error: json.error, success: false })
        }

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <Card>
                <div className="p-3">
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Team - Profit</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>From Date</Label>
                            <Input onChange={this.onInputChange} type="date" name="fromDate" placeholder="From Date" />
                        </FormGroup>

                        <FormGroup>
                            <Label>To Date</Label>
                            <Input onChange={this.onInputChange} type="date" name="toDate" placeholder="To Date" />
                        </FormGroup>

                        <h6>Total: {this.state.totalBtcPrice} BTC</h6>
                        <h6>Invoices: {this.state.data.length}</h6>
                        <h6>Total Profit: {this.state.totalProfit} BTC</h6>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doTeamProfit} color="info" disabled>Loading...</Button> : <Button type="submit" onClick={this.doTeamProfit} color="info">Get Result</Button>}

                        <Table responsive className="mt-3">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Plan</th>
                                    <th>BTC</th>
                                    <th>Created At</th>
                                    <th>Paid At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((d, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{d.username}</td>
                                            <td>{d.plan_name}</td>
                                            <td>{d.btc_price}</td>
                                            <td>{new Date(d.created_at).toUTCString()}</td>
                                            <td>{new Date(d.paid_at).toUTCString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default Profit;