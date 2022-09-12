import React from 'react'
import { Alert, Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import ApiService from '../../../services/api'

class DocumentSettings extends React.Component {
    constructor(props) {
        super(props)

        this.uploadDocument = this.uploadDocument.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            image: '',
            success: false,
            error: null,
            loading: false,
            isFetching: false,
        }
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async uploadDocument(e) {
        e.preventDefault()

        if (!this.state.image) {
            alert('Please select a image to upload.')
        }
        else {
            this.setState({ isFetching: true })

            const response = await ApiService.post('/user/document')

            if (response.ok) {
                this.setState({ error: null, success: true })
            }
            else {
                const json = await response.json()
                this.setState({ error: json.error, success: false })
            }

            this.setState({ isFetching: false })
        }
    }

    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-account-settings-variant mr-2" />
                    Identity Document
                </CardTitle>
                <CardBody>
                    <p>Documents will be verified within 48 hours.</p>
                    <p>If you have already uploaded a document and re-uploaded it, the old one will be overwritten.</p>

                    {!this.state.isFetching && this.state.success && <Alert color="success">Identity Document sent successfully.</Alert>}
                    {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form encType="multipart/form-data">
                        {/* <FormGroup>
                            <Label>Identity Document</Label>
                            <Input onChange={this.onInputChange} value={this.state.btcAddress} type="text" name="btcAddress" />
                        </FormGroup> */}
                        <FormGroup>
                            <Label>Identity Document Image</Label>
                            <Input onChange={this.onInputChange} value={this.state.image} type="file" name="image" />
                        </FormGroup>
                        {this.state.isFetching ? <Button type="submit" onClick={this.uploadDocument} color="primary" disabled>Uploading...</Button> : <Button type="submit" onClick={this.uploadDocument} color="primary">Upload</Button>}
                    </Form>
                </CardBody>
            </Card>
        )
    }
}

export default DocumentSettings
