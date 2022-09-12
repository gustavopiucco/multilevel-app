import React from "react"
import Chart from 'react-c3-component'
import 'c3/c3.css'
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap'

class CryptoChart extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Card className="card-hover">
                        <CardBody>
                            <div className="d-md-flex align-items-center">
                                <div>
                                    <CardTitle>Price Chart</CardTitle>
                                    <CardSubtitle>Cryptocoins Price Chart</CardSubtitle>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Chart
                                    style={{ height: '350px', width: '100%' }}
                                    config={{
                                        data: {
                                            columns: [
                                                ['Bitcoin', 0, 15, 15, 16, 8, 2, 10, 7, 16],
                                                ['Ethereum', 0, 15, 15, 43, 8, 2, 10, 7, 16],
                                                ['XRP', 0, 15, 15, 16, 8, 2, 10, 7, 16],
                                                ['Litecoin', 0, 15, 15, 43, 22, 2, 10, 7, 16],
                                                ['Dash', 0, 15, 15, 43, 22, 2, 10, 7, 16],
                                                ['Cardano', 0, 15, 15, 43, 22, 2, 10, 7, 16]
                                            ],
                                            type: 'area-spline',
                                            groups: [['Bitcoin', 'Ethereum', 'XRP', 'Litecoin', 'Dash', 'Cardano']]
                                        },
                                        axis: {
                                            y: {
                                                show: true,
                                                tick: {
                                                    count: 0,
                                                    outer: false
                                                }
                                            },
                                            x: {
                                                show: true
                                            }
                                        },
                                        padding: {
                                            top: 20,
                                            right: 10,
                                            bottom: 0,
                                            left: 30
                                        },
                                        point: {
                                            r: 2
                                        },
                                        legend: {
                                            hide: true
                                        },
                                        color: {
                                            pattern: ['#ff821c', '#40c4ff', '#1240c2']
                                        }
                                    }}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CryptoChart
