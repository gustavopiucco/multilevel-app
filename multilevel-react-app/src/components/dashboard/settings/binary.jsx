import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, Input, FormGroup, Label } from 'reactstrap'
import ApiService from '../../../services/api'

class BinarySettings extends React.Component {
    constructor(props) {
        super(props)

        this.updateSettings = this.updateSettings.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            binarySide: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })

        const response = await ApiService.get('/user/binaryside')

        if (response.ok) {
            const json = await response.json()
            this.setState({ binarySide: json.data })
        }

        this.setState({ loading: false })
    }

    onInputChange(e) {
        this.setState({ success: false })
        this.setState({ [e.target.name]: e.target.value });
    }

    async updateSettings(event) {
        event.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.put('/user/binaryside', { binarySide: this.state.binarySide })

        this.setState({ success: response.ok, isFetching: false })
    }

    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Binary Settings
                                </CardTitle>
                <CardBody>
                    {!this.state.isFetching && this.state.success && <Alert color="success">Default binary side updated to <strong>{this.state.binarySide.toUpperCase()}</strong> side.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    {this.state.loading ? <h5 className="text-center">Loading...</h5> :
                        <Form>
                            <Label>Default Binary Side</Label>
                            <FormGroup className="mb-3">
                                <Input type="select" onChange={this.onInputChange} value={this.state.binarySide} placeholder="Binary Side" name="binarySide">
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </Input>
                            </FormGroup>
                            {this.state.isFetching ? <Button type="submit" onClick={this.updateSettings} color="primary" disabled>Saving...</Button> : <Button type="submit" onClick={this.updateSettings} color="primary">Save</Button>}
                        </Form>
                    }
                </CardBody>
            </Card>
        )
    }
}

export default BinarySettings
