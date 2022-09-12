import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input, CustomInput } from 'reactstrap'
import ApiService from '../../services/api'

class Payment extends React.Component {
    constructor(props) {
        super(props)

        this.reloadBalance = this.reloadBalance.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.doPay = this.doPay.bind(this)

        this.state = {
            type: '',
            invoiceId: '',
            invoicePrice: '',
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

    async doPay(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.post('/payment', {type: this.state.type, invoiceId: this.state.invoiceId, invoicePrice: this.state.invoicePrice, token: this.state.token })

        if (response.ok) {
            this.setState({ btcAddress: '', invoicePrice: '', token: '', error: null, success: true })
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
                    <CardTitle><i className="mdi mdi-currency-usd mr-2"></i>Payment</CardTitle>
                </div>
                <CardBody className="border-top">
                    <Card className="border bg-light">
                        <CardBody>
                            <h4>Network Balance Available: U$ {this.state.data && this.state.data.network_balance}</h4>
                            <h4>Balance Available: U$ {this.state.data && this.state.data.balance}</h4>
                        </CardBody>
                    </Card>

                    {!this.state.isFetching && this.state.success && <Alert color="success">Payment successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Type</Label>
                            <CustomInput onChange={this.onInputChange} value="network_balance" type="radio" id="network_balance" name="type" label="Network Balance" />
                            <CustomInput onChange={this.onInputChange} value="balance" type="radio" id="balance" name="type" label="Balance" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Invoice ID</Label>
                            <Input onChange={this.onInputChange} value={this.state.invoiceId} type="number" name="invoiceId" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Invoice Price</Label>
                            <Input onChange={this.onInputChange} value={this.state.invoicePrice} type="number" name="invoicePrice" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Token</Label>
                            <Input onChange={this.onInputChange} value={this.state.token} type="text" name="token" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doPay} color="primary" disabled>Loading...</Button> : <Button type="submit" onClick={this.doPay} color="primary">Pay</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default Payment