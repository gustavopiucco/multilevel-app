import React from "react";
import { Alert, Card, CardBody, CardTitle, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import ApiService from '../../../services/api'

class SearchUser extends React.Component {
    constructor(props) {
        super(props)

        this.onInputChange = this.onInputChange.bind(this)
        this.doResetUserPin = this.doResetUserPin.bind(this)

        this.state = {
            email: '',
            data: null,
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doResetUserPin(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.get('/admin/searchuser/?email=' + this.state.email)

        if (response.ok) {
            const json = await response.json()
            this.setState({ error: null, data: json.data, success: true })
            alert(json.data)
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
                    <CardTitle><i className="mdi mdi-account-settings-variant mr-2"></i>Admin - Search User</CardTitle>
                </div>
                <CardBody className="border-top">

                    {!this.state.isFetching && this.state.success && <Alert color="success">Successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input onChange={this.onInputChange} type="email" name="email" />
                        </FormGroup>

                        {this.state.isFetching ? <Button type="submit" onClick={this.doResetUserPin} color="info" disabled>Searching...</Button> : <Button type="submit" onClick={this.doResetUserPin} color="info">Search</Button>}
                    </Form>

                </CardBody>
            </Card>
        )
    }
}

export default SearchUser