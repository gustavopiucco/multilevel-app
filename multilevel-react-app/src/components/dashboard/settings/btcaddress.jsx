import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiService from '../../../services/api'

class BtcAddressSettings extends React.Component {
    constructor(props) {
        super(props)

        this.updateBtcAddress = this.updateBtcAddress.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            btcAddress: '',
            pin: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async updateBtcAddress(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/user/btcaddress', { btcAddress: this.state.btcAddress, pin: this.state.pin })

        if (response.ok) {
            this.setState({ error: null, success: true, pin: '' })
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
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Bitcoin Address Settings
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">Bitcoin Address updated successfully to <strong>{this.state.btcAddress}</strong>.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>New Bitcoin Address</Label>
                            <Input onChange={this.onInputChange} value={this.state.btcAddress} type="text" name="btcAddress" />
                        </FormGroup>
                        <FormGroup>
                            <Label>PIN</Label>
                            <Input onChange={this.onInputChange} value={this.state.pin} type="text" name="pin" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.updateBtcAddress} color="primary" disabled>Saving...</Button> : <Button type="submit" onClick={this.updateBtcAddress} color="primary">Save</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default BtcAddressSettings
