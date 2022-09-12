import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class ActivateUser extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doActivateUser = this.doActivateUser.bind(this)

        this.state = {
            address: '',
            amount: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doActivateUser(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/admin/activateuser', { 
            address: this.state.address,
            amount: this.state.amount
        })

        if (response.ok) {
            this.setState({ error: null, success: true })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error, success: false })
        }

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <Card>
                <div className="p-3">
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Admin - Pay Invoice</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.success && <Alert color="success">Successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input onChange={this.onInputChange} type="text" name="address" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Amount</Label>
                            <Input onChange={this.onInputChange} type="text" name="amount" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doActivateUser} color="info" disabled>Loading...</Button> : <Button type="submit" onClick={this.doActivateUser} color="info">Update</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default ActivateUser;