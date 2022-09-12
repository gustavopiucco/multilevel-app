import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button } from 'reactstrap'
import ApiService from '../../../services/api'

class PinSettings extends React.Component {
    constructor(props) {
        super(props)

        this.requestPin = this.requestPin.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async requestPin(e) {
        e.preventDefault()

        this.setState({success: false, isFetching: true })

        const response = await ApiService.post('/pin')

        if (response.ok) {
            this.setState({ error: null, success: true })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error })
        }

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Request PIN
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">New PIN requested. Please check your email.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <p>To make changes to your account you need to request a PIN by clicking on the button below. A new random PIN will be sent to your email. Use this PIN to change your settings.</p>
                    <p>Each PIN requested is valid for 30 minutes.</p>
                    <p>You can only create a new PIN every 5 minutes.</p>

                    {this.state.isFetching ? <Button type="submit" onClick={this.requestPin} color="primary" disabled>Requesting...</Button> : <Button type="submit" onClick={this.requestPin} color="primary">Request</Button>}
                </CardBody>
            </Card>
        )
    }
}

export default PinSettings
