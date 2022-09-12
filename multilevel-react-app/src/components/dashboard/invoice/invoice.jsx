import React from "react"
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Badge, Button } from 'reactstrap'
import Countdown from 'react-countdown-now'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ApiService from '../../../services/api'

class Invoice extends React.Component {
    constructor(props) {
        super(props)

        this.cancelInvoice = this.cancelInvoice.bind(this)
        this.countdownRender = this.countdownRender.bind(this)

        this.state = {
            countdown: 0,
            btcAddressCopied: false,
            btcPriceCopied: false,
            status: null,
            isFetching: false
        }
    }

    componentDidMount() {
        let date = new Date(this.props.invoice.created_at)
        //date = date.getTime() + 120000 * 60
        date = date.getTime() + 12 * 60 * 60 * 1000
        this.setState({ countdown: date })

        this.setState({ status: this.props.invoice.status })
    }

    countdownRender({ hours, minutes, seconds, completed }) {
        if (completed || this.props.invoice.status === 'expired') {
            return <span>Expired</span>
        }
        else {
            return <span>Expires in {hours ? hours + ' hours, ' : ''} {minutes} minutes and {seconds} seconds</span>
        }
    }

    async cancelInvoice() {
        if (window.confirm('Confirm?')) {
            this.setState({ isFetching: true })

            const response = await ApiService.put('/user_invoices')
            
            if (response.ok) {
                this.props.reloadInvoices()
            }

            this.setState({ isFetching: false })
        }
    }

    getStatusHtml(status) {
        switch (status) {
            case 'plan_cycle_completed':
                return <h5><Badge color="secondary">Plan Cycle Completed</Badge></h5>
            case 'waiting_payment':
                return <h5><Badge color="info">Waiting Payment</Badge></h5>
            case 'waiting_confirmations':
                return <h5><Badge color="success">Waiting Bitcoin Confirmations</Badge></h5>
            case 'payment_confirmed':
                return <h5><Badge color="success">Payment Confirmed</Badge></h5>
            case 'expired':
                return <h5><Badge color="warning">Expired</Badge></h5>
            default:
                return <h5><Badge color="secondary">None</Badge></h5>
        }
    }

    render() {
        return (
            <Col md="6" lg="4">
                <Card>
                    <CardTitle className="border-bottom p-3 mb-0">
                        <i className="mdi mdi-tab-unselected mr-2"> </i>
                        Invoice ID: {this.props.invoice.id}
                    </CardTitle>
                    <CardBody>
                        <div className="text-center mt-4">
                            <img src={'https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bitcoin:' + this.props.invoice.btc_address + '?amount=' + this.props.invoice.btc_price} width="250" alt="QR Code" />
                            <CardTitle className="mt-2">{this.props.invoice.name} {this.props.invoice.is_upgrade ? <Badge color="info">Upgrade</Badge> : ''}</CardTitle>
                            <CardSubtitle>
                                {this.props.invoice.status === 'payment_confirmed' ? 'Confirmed' : <Countdown date={this.state.countdown} renderer={this.countdownRender} />}
                            </CardSubtitle>
                            <Row>
                                <Col xs="6">
                                    <i className="mdi mdi-currency-btc"></i>
                                    <span className="font-medium ml-2 mr-2">{this.props.invoice.btc_price} BTC</span>
                                    <CopyToClipboard text={this.props.invoice.btc_price} onCopy={() => this.setState({ btcPriceCopied: true })}>
                                        <Button color="primary" size="sm">Copy</Button>
                                    </CopyToClipboard>
                                </Col>
                                <Col xs="6">
                                    <i className="mdi mdi-currency-usd"></i>
                                    <span className="font-medium ml-2">U$ {this.props.invoice.price}</span>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                    <CardBody className="border-top">
                        <div>
                            <small className="text-muted">Bitcoin Address </small>
                            <h6>
                                <span className="mr-2">{this.props.invoice.btc_address}</span>
                                <CopyToClipboard text={this.props.invoice.btc_address} onCopy={() => this.setState({ btcAddressCopied: true })}>
                                    <Button color="primary" size="sm">Copy</Button>
                                </CopyToClipboard>
                            </h6>
                            <small className="text-muted pt-4 db">Status</small>
                            {this.getStatusHtml(this.props.invoice.status)}
                            <small className="text-muted pt-4 db">Created at</small>
                            <h6>{new Date(this.props.invoice.created_at).toUTCString()}</h6>

                            
                            {this.props.invoice.status === 'waiting_payment' && 
                            <Button onClick={this.cancelInvoice} color="warning" size="sm">
                                <span><i className="fa fa-trash"></i> {this.state.isFetching ? 'Canceling...' : 'Cancel'}</span>
                            </Button>}

                            {/* <Button onClick={this.deleteInvoice} color="warning" size="sm" disabled={this.state.isFetching || this.props.invoice.status === 'payment_confirmed' || this.props.invoice.status === 'plan_cycle_completed' || this.props.invoice.status === 'waiting_confirmations'}>
                                <span><i className="fa fa-trash"></i> {this.state.isFetching ? 'Canceling...' : 'Cancel'}</span>
                            </Button> */}
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default Invoice;