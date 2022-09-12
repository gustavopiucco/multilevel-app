import React from "react"
import { Row, Col, Card, CardBody } from 'reactstrap'

class CryptoCoins extends React.Component {
    render() {
        return (
            <Row>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#ff9900' }}>
                    <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc BTC text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">BTC / Bitcoin</h6>
                                    <h6 className="text-white font-medium mb-0">$767.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#333' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc ETH text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">ETH / Ethereum</h6>
                                    <h6 className="text-white font-medium mb-0">$767.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#346aa9' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc XRP text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">XRP / Ripple</h6>
                                    <h6 className="text-white font-medium mb-0">$2,567.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#345d9d' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc LTC text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">LTC / Litecoin</h6>
                                    <h6 className="text-white font-medium mb-0">$2,567.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#1c75bc' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc DASH text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">DASH / DASH</h6>
                                    <h6 className="text-white font-medium mb-0">$2,567.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col sm="12" lg="4">
                    <Card className="card-hover" style={{ backgroundColor: '#3ba474' }}>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-2">
                                    <h1 className="mb-0"><i className="cc DASH text-white"></i></h1></div>
                                <div>
                                    <h6 className="font-12 text-white mb-1 op-7">ADA / Cardano</h6>
                                    <h6 className="text-white font-medium mb-0">$2,567.53</h6>
                                </div>
                            </div>
                            <Row className="text-center text-white mt-4">
                                <Col xs="4">
                                    <span className="font-14 d-block">% 1h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>0.08</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 24h</span>
                                    <span className="font-medium"><i className="fas fa-arrow-down"></i>-3.06</span>
                                </Col>
                                <Col xs="4">
                                    <span className="font-14 d-block">% 7d</span>
                                    <span className="font-medium"><i className="fas fa-arrow-up"></i>-20.08</span>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CryptoCoins