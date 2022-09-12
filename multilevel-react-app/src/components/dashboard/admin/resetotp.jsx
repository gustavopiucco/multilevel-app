import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class ResetOTP extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doResetOTP = this.doResetOTP.bind(this)

        this.state = {
            username: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doResetOTP(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/admin/resetotp', { 
            username: this.state.username
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
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Admin - Reset OTP</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.success && <Alert color="success">Successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input onChange={this.onInputChange} type="text" name="username" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doResetOTP} color="info" disabled>Reseting...</Button> : <Button type="submit" onClick={this.doResetOTP} color="info">Reset</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default ResetOTP;