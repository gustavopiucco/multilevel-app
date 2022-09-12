import React from "react";
import { Link } from 'react-router-dom'
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input, CustomInput } from 'reactstrap';
import ApiService from '../../services/api'

class Withdraw extends React.Component {
    constructor(props) {
        super(props)

        this.reloadBalance = this.reloadBalance.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.doWithdraw = this.doWithdraw.bind(this)

        this.state = {
            type: '',
            btcAddress: '',
            amount: '',
            token: '',
            data: null,
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    componentDidMount() {
        this.reloadBalance()
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async reloadBalance() {
        this.setState({ loading: true })
        const response = await ApiService.get('/user/balance')

        const json = await response.json()

        this.setState({ data: json.data, loading: false })
    }

    async doWithdraw(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.post('/withdraw', { type: this.state.type, amount: this.state.amount, token: this.state.token })

        if (response.ok) {
            this.setState({ btcAddress: '', amount: '', token: '', error: null, success: true })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error, success: false })
        }

        this.reloadBalance()

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <Card>
                <div className="p-3">
                    <CardTitle><i className="mdi mdi-currency-usd-off mr-2"></i>Withdraw</CardTitle>
                </div>
                <CardBody className="border-top">
                    <Card className="border bg-light">
                        <CardBody>
                            <h4>Network Balance Available: U$ {this.state.data && this.state.data.network_balance}</h4>
                            <h4>Balance Available: U$ {this.state.data && this.state.data.balance}</h4>
                        </CardBody>
                    </Card>

                    {!this.state.isFetching && this.state.success && <Alert color="success">Withdraw successfully. Check status <Link to="/financial/transactions?type=withdraw">here</Link>.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Type</Label>
                            <CustomInput onChange={this.onInputChange} value="network_balance" type="radio" id="network_balance" name="type" label="Network Balance" />
                            <CustomInput onChange={this.onInputChange} value="balance" type="radio" id="balance" name="type" label="Balance" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Bitcoin Address</Label>
                            <Input disabled value={this.state.data && this.state.data.btc_address} type="text" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Amount</Label>
                            <Input onChange={this.onInputChange} value={this.state.amount} type="number" name="amount" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Token</Label>
                            <Input onChange={this.onInputChange} value={this.state.token} type="text" name="token" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doWithdraw} color="primary" disabled>Loading...</Button> : <Button type="submit" onClick={this.doWithdraw} color="primary">Withdraw</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default Withdraw;