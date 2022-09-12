import React from 'react'
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap'

class CryptoMarket extends React.Component {
    renderCurrency(id) {
        switch (id) {
            case 0:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc BTC" title="BTC"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> Bitcoin</a></h6>
                            <small className="text-muted">BTC</small>
                        </td>
                    </React.Fragment>
                )
            case 1:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc ETH" title="ETH"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> Ethereum</a></h6>
                            <small className="text-muted">ETH</small>
                        </td>
                    </React.Fragment>
                )
            case 2:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc LTC" title="LTC"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> Litecoin</a></h6>
                            <small className="text-muted">LTC</small>
                        </td>
                    </React.Fragment>
                )
            case 3:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc XRP" title="XRP"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> Ripple</a></h6>
                            <small className="text-muted">XRP</small>
                        </td>
                    </React.Fragment>
                )
            case 4:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc ADA" title="ADA"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> Cardano</a></h6>
                            <small className="text-muted">ADA</small>
                        </td>
                    </React.Fragment>
                )
            case 5:
                return (
                    <React.Fragment>
                        <td><span><a href="/"><i className=" display-7 cc DASH" title="DASH"></i></a></span></td>
                        <td>
                            <h6><a className="font-medium link" href="/"> DASH</a></h6>
                            <small className="text-muted">DASH</small>
                        </td>
                    </React.Fragment>
                )
            default:
                return ''
        }
    }

    renderResult(result) {
        if (parseFloat(result) > 0)
            return <td className="no-wrap"><span className="badge badge-success"><i className="fa fa-chevron-up"></i> {result}%</span></td>
        else
            return <td className="no-wrap"><span className="badge badge-danger"><i className="fa fa-chevron-down"></i> {result}%</span></td>
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <Card>
                        <CardBody>
                            <CardTitle>Transactions</CardTitle>
                            <CardSubtitle>Lastest Transactions of the Robot</CardSubtitle>
                            <div className="mt-3">
                                <Table className="mb-3" bordered responsive>
                                    <thead>
                                        <tr className="bg-light">
                                            <th>#</th>
                                            <th>Currency</th>
                                            <th>Price</th>
                                            <th>Transaction ID</th>
                                            <th>Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.robotData && this.props.robotData.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    {this.renderCurrency(parseFloat(data.currency))}
                                                    <td>
                                                        <p>U$ {data.price}</p>
                                                    </td>
                                                    <td>
                                                        <p>{data.id}</p>
                                                    </td>
                                                    {this.renderResult(data.result)}
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CryptoMarket