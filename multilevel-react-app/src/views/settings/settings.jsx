import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import ApiService from '../../services/api'
import BinarySettings from '../../components/dashboard/settings/binary'
import PasswordSettings from '../../components/dashboard/settings/password'
import PinSettings from '../../components/dashboard/settings/pin'
import BtcAddressSettings from '../../components/dashboard/settings/btcaddress'
import NameSettings from '../../components/dashboard/settings/name'
import EmailSettings from '../../components/dashboard/settings/email'
import OTPSettings from '../../components/dashboard/settings/otp'
import profilephoto from '../../assets/images/users/default_avatar.jpg'
//import DocumentSettings from '../../components/dashboard/settings/document';

class Settings extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null
        }
    }

    async componentDidMount() {
        const response = await ApiService.get('/user')

        if (response.ok) {
            const json = await response.json()

            this.setState({ user: json.data });
        }
    }

    render() {
        return <div>
            <Row>
                <Col xs="12" md="12" lg="4">
                    <Card>
                        <CardBody>
                            <div className="text-center mt-4">
                                <img src={profilephoto} className="rounded-circle" width="150" alt="" />
                                <CardTitle className="mt-2">{this.state.user && this.state.user.name}</CardTitle>
                                <CardSubtitle>User</CardSubtitle>
                                <Row className="text-center justify-content-md-center">
                                    <Col xs="4">
                                        <a href="/" className="link">
                                            <i className="mdi mdi mdi-shopping"></i>
                                            <span className="font-medium ml-2">{this.state.user && this.state.user.total_profit}</span>
                                        </a>
                                    </Col>
                                    <Col xs="4">
                                        <a href="/" className="link">
                                            <i className="mdi mdi-star-circle"></i>
                                            <span className="font-medium ml-2">{this.state.user && this.state.user.career_points}</span>
                                        </a>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>
                        <CardBody className="border-top">
                            <div>
                                <small className="text-muted">Email</small>
                                <h6>{this.state.user && this.state.user.email}</h6>
                                <small className="text-muted">Name</small>
                                <h6>{this.state.user && this.state.user.name}</h6>
                                <small className="text-muted">Username</small>
                                <h6>{this.state.user && this.state.user.username}</h6>
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12" md="12" lg="8">
                    <Row>
                        <Col sm="12">
                            <PinSettings />
                        </Col>

                        <Col sm="12">
                            <OTPSettings />
                        </Col>

                        {/* <Col sm="12">
                            <DocumentSettings />
                        </Col> */}

                        <Col sm="12">
                            <BinarySettings />
                        </Col>

                        <Col sm="12">
                            <BtcAddressSettings />
                        </Col>

                        <Col sm="12">
                            <NameSettings />
                        </Col>
                        
                        <Col sm="12">
                            <EmailSettings />
                        </Col>

                        <Col sm="12">
                            <PasswordSettings />
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    }
}

export default Settings
