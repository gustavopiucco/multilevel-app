import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiService from '../../../services/api'

class EmailSettings extends React.Component {
    constructor(props) {
        super(props)

        this.changeUser = this.changeUser.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            newEmail: '',
            confirmNewEmail: '',
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

    async changeUser(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/user/email', { newEmail: this.state.newEmail, confirmNewEmail: this.state.confirmNewEmail, pin: this.state.pin })

        if (response.ok) {
            this.setState({ error: null, success: true, newEmail: '', confirmNewEmail: '', pin: '' })
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
                    Email Settings
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">Email updated successfully. Please log out and log in again to make the changes.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>New Email</Label>
                            <Input onChange={this.onInputChange} value={this.state.newEmail} type="email" name="newEmail" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm New Email</Label>
                            <Input onChange={this.onInputChange} value={this.state.confirmNewEmail} type="email" name="confirmNewEmail" />
                        </FormGroup>
                        <FormGroup>
                            <Label>PIN</Label>
                            <Input onChange={this.onInputChange} value={this.state.pin} type="text" name="pin" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.changeUser} color="primary" disabled>Saving...</Button> : <Button type="submit" onClick={this.changeUser} color="primary">Save</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default EmailSettings
