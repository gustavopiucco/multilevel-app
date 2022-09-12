import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Row, Col, Button } from 'reactstrap'
import ApiService from '../../services/api'
import logo from '../../assets/images/logo/logo_dark.png'
import business_background from '../../assets/images/background/business_background.jpg'

const backgroundStyle = {
    backgroundImage: 'url(' + business_background + ')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#ffffff'
}
class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            isFetching: false,
            success: false,
            error: ''
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.doLogin = this.doLogin.bind(this)
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async doLogin(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.post('/auth/reset-password', { username: this.state.username, email: this.state.email }, false, true)

        const json = await response.json()

        if (response.ok) {
            this.setState({ username: '', email: '', success: true, error: '' })
        }
        else {
            this.setState({ success: false, error: json.error })
        }

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={backgroundStyle}>
                <div className="auth-box" style={{ borderRadius: 5 }}>
                    <Row>
                        <Col xs="12">
                            <div className="p-4">
                                <div className="text-center mb-4">
                                    <img src={logo} className="mb-3" width="250" alt="Multilevel" />
                                </div>

                                {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                                {!this.state.isFetching && this.state.success && <Alert color="success">Check your email.</Alert>}

                                <Form className="mt-3" id="loginform" action="">
                                    <InputGroup className="mb-2" size="lg">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti-user" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="username" id="username" name="username" value={this.state.username} onChange={this.onInputChange} placeholder="Username" />
                                    </InputGroup>

                                    <InputGroup className="mb-3" size="lg">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ti-user" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="email" id="email" name="email" value={this.state.email} onChange={this.onInputChange} placeholder="Email" />
                                    </InputGroup>

                                    <Row className="mb-3">
                                        <Col xs="12">
                                            {
                                                this.state.isFetching ? <Button onClick={this.doLogin} color="primary" size="lg" type="submit" block disabled>Loading...</Button> : <Button onClick={this.doLogin} color="primary" size="lg" type="submit" block>Reset</Button>
                                            }
                                        </Col>
                                    </Row>

                                    <div className="text-center">
                                        <Link to="/login" className="text-info ml-1">
                                            <b>Back to login</b>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Login
