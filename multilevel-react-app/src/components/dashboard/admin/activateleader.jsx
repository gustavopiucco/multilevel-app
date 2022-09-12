import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class AdminActivateLeader extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doActivateLeader = this.doActivateLeader.bind(this)

        this.state = {
            leaderUsername: '',
            leaderPlanId: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doActivateLeader(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/admin/activateleader', { leaderUsername: this.state.leaderUsername, leaderPlanId: this.state.leaderPlanId })

        if (response.ok) {
            this.setState({ btcAddress: '', amount: '', error: null, success: true })
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
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Admin - Activate Leader</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.success && <Alert color="success">Successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Leader Username</Label>
                            <Input onChange={this.onInputChange} type="text" name="leaderUsername" />
                        </FormGroup>

                        <FormGroup>
                            <Label>Plan</Label>
                            <Input type="select" onChange={this.onInputChange} name="leaderPlanId">
                                <option value="">Select plan</option>
                                <option value="1">U$ 100.00</option>
                                <option value="2">U$ 500.00</option>
                                <option value="3">U$ 1000.00</option>
                                <option value="4">U$ 2500.00</option>
                                <option value="5">U$ 5000.00</option>
                                <option value="6">U$ 12500.00</option>
                                <option value="7">U$ 25000.00</option>
                                <option value="8">U$ 50000.00</option>
                            </Input>
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doActivateLeader} color="info" disabled>Updading...</Button> : <Button type="submit" onClick={this.doActivateLeader} color="info">Update</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default AdminActivateLeader;