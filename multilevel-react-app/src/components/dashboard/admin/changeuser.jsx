import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class ChangeUser extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doChangeUser = this.doChangeUser.bind(this)

        this.state = {
            username: '',
            newUsername: '',
            newEmail: '',
            newName: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doChangeUser(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/admin/changeuser', { 
            username: this.state.username, 
            newUsername: this.state.newUsername,
            newEmail: this.state.newEmail,
            newName: this.state.newName
        })

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
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Admin - Change User</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.success && <Alert color="success">Successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input onChange={this.onInputChange} type="text" name="username" />
                        </FormGroup>

                        <FormGroup>
                            <Label>New Username</Label>
                            <Input onChange={this.onInputChange} type="text" name="newUsername" />
                        </FormGroup>

                        <FormGroup>
                            <Label>New Email</Label>
                            <Input onChange={this.onInputChange} type="email" name="newEmail" />
                        </FormGroup>

                        <FormGroup>
                            <Label>New Name</Label>
                            <Input onChange={this.onInputChange} type="text" name="newName" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doChangeUser} color="info" disabled>Updading...</Button> : <Button type="submit" onClick={this.doChangeUser} color="info">Update</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default ChangeUser;