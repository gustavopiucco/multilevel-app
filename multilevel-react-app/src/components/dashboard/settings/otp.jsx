import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Label, Input, FormGroup, Form } from 'reactstrap'
import ApiService from '../../../services/api'

class OTPSettings extends React.Component {
    constructor(props) {
        super(props)

        this.startOTP = this.startOTP.bind(this)
        this.verifyToken = this.verifyToken.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            uri: null,
            token: null,
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async startOTP(e) {
        e.preventDefault()

        this.setState({ success: false, isFetching: true })

        const response = await ApiService.post('/otp/start')

        if (response.ok) {
            const json = await response.json()
            this.setState({ error: null, uri: json.uri })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error })
        }

        this.setState({ isFetching: false })
    }

    async verifyToken(e) {
        e.preventDefault()

        this.setState({success: false, isFetching: true })

        const response = await ApiService.post('/otp/verify', { token: this.state.token })

        if (response.ok) {
            this.setState({ error: null, uri: null, success: true })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error })
        }

        this.setState({ isFetching: false })
    }

    renderStart() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Enable OTP (One Time Password - Two Factor Authentication)
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <p>To increase the security of our system we have implemented OTP (One Time Password - Two Factor Authentication).</p>
                    <p>We recommend using the <strong>Google Authenticator</strong> or <strong>Authy</strong> app.</p>

                    {this.state.isFetching ? <Button type="submit" onClick={this.startOTP} color="primary" disabled>Loading...</Button> : <Button type="submit" onClick={this.startOTP} color="primary">Start</Button>}
                </CardBody>
            </Card>
        )
    }

    renderQRCodeAndToken() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Enable OTP (One Time Password - Two Factor Authentication)
                </CardTitle>
                <CardBody>
                    {/* {!this.state.isFetching && this.state.success && <Alert color="success">Your OTP was successfully enabled.</Alert>} */}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <p>Scan the following QR Code</p>
                    
                    <img src={'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=' + this.state.uri} width="250" alt="QR Code" />

                    <Form>
                        <FormGroup>
                            <Label>Token (6 digits)</Label>
                            <Input onChange={this.onInputChange} value={this.state.token} type="text" name="token" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.verifyToken} color="primary" disabled>Loading...</Button> : <Button type="submit" onClick={this.verifyToken} color="primary">Enable</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }

    renderSuccessfullyEnabled() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Enable OTP (One Time Password - Two Factor Authentication)
                </CardTitle>
                <CardBody>
                    <Alert color="success">Your OTP was successfully enabled.</Alert>
                </CardBody>
            </Card>
        )
    }

    render() {
        if (this.state.uri)
            return this.renderQRCodeAndToken()
        else if (this.state.success === true)
            return this.renderSuccessfullyEnabled()
        else
            return this.renderStart()
    }
}

export default OTPSettings
