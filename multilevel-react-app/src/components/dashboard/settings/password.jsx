import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiService from '../../../services/api'

class PasswordSettings extends React.Component {
    constructor(props) {
        super(props)

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this)
        this.updatePassword = this.updatePassword.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            newPassword: '',
            confirmNewPassword: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onRadioBtnClick(radioSelected) {
        this.setState({ binarySide: radioSelected })
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async updatePassword(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/user/password', { newPassword: this.state.newPassword, confirmNewPassword: this.state.confirmNewPassword })

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
                    Password Settings
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">Password updated successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>New Password</Label>
                            <Input onChange={this.onInputChange} value={this.state.newPassword} type="password" name="newPassword" />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm New Password</Label>
                            <Input onChange={this.onInputChange} value={this.state.confirmNewPassword} type="password" name="confirmNewPassword" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.updatePassword} color="primary" disabled>Saving...</Button> : <Button type="submit" onClick={this.updatePassword} color="primary">Save</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default PasswordSettings
