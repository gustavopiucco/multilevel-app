import React from "react";
import { Row, Col, Card, CardBody, CardTitle, Form, InputGroup, Input, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import ApiService from '../../services/api'
import BinaryNetwork from "../../components/dashboard/network/binary";

class Binary extends React.Component {
    constructor(props) {
        super(props)

        this.changeBinaryData = this.changeBinaryData.bind(this)
        this.changeBinaryUsername = this.changeBinaryUsername.bind(this)
        this.reloadData = this.reloadData.bind(this)
        this.onInputChange = this.onInputChange.bind(this)

        this.state = {
            data: null,
            searchUsername: '',
            isFetching: false
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/binary')
        let json

        if (response.ok) {
            json = await response.json()
        }

        this.setState({ isFetching: false, data: json.data })
    }

    async reloadData(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.get('/binary')
        let json

        if (response.ok) {
            json = await response.json()
        }

        this.setState({ isFetching: false, data: json.data })
    }

    async changeBinaryUsername(username) {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/binary/' + username)
        let json

        if (response.ok) {
            json = await response.json()
            this.setState({ data: json.data })
        }

        this.setState({ isFetching: false })
    }

    async changeBinaryData(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.get('/binary/' + this.state.searchUsername)
        let json

        if (response.ok) {
            json = await response.json()
            this.setState({ data: json.data })
        }

        this.setState({ isFetching: false })
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col sm="6" md="6">
                        <Card>
                            <CardTitle className="border-bottom p-3 mb-0">
                                <i className="fas fa-search mr-2" />
                                Search an user
                            </CardTitle>
                            <CardBody>
                                <Form>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="far fa-user" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input onChange={this.onInputChange} name="searchUsername" type="text" placeholder="Username" />
                                        <InputGroupAddon addonType="append">
                                            <Button onClick={this.changeBinaryData} type="submit" color="secondary"><i className="ti-search"></i></Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col sm="6" md="6">
                        <Card>
                            <CardTitle className="border-bottom p-3 mb-0">
                                <i className="mdi mdi-account-settings-variant mr-2" />
                                Settings
                            </CardTitle>
                            <CardBody>
                                <Form>
                                    <Button onClick={this.reloadData} type="submit" color="secondary">Back to Top</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Card className="card-hover">
                    <CardBody>
                        <CardTitle>Binary Rules</CardTitle>
                        <Card className="border bg-light">
                            <CardBody>
                                <p>The first direct position on each side of the binary network doesn't generate points.</p>
                                <p>The maximum amount of the binary bonus is the amount of the plan that you activated.</p>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card>
                    <CardTitle className="border-bottom p-3">
                        <i className="mdi mdi-file-tree mr-2" />
                        Binary Network
                </CardTitle>
                    <CardBody>
                        <Row>
                            <Col xs={12}>
                                {this.state.isFetching && <h5 className="text-center">Loading...</h5>}
                                {!this.state.isFetching && this.state.data && <BinaryNetwork changeBinaryUsername={this.changeBinaryUsername} data={this.state.data} />}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default Binary;