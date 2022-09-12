import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiService from '../../../services/api'

class NameSettings extends React.Component {
    constructor(props) {
        super(props)

        this.changeUser = this.changeUser.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
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

    async changeUser(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/user/name', { newName: this.state.newName })

        if (response.ok) {
            this.setState({ error: null, success: true, newName: '' })
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
                    Name Settings
                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">Name updated successfully. Please log out and log in again to make the changes.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>New Name</Label>
                            <Input onChange={this.onInputChange} value={this.state.newName} type="text" name="newName" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.changeUser} color="primary" disabled>Saving...</Button> : <Button type="submit" onClick={this.changeUser} color="primary">Save</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default NameSettings
