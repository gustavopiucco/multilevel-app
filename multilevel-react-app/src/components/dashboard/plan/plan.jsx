import React from "react";
import { withRouter } from 'react-router-dom';
import { Alert, Col, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import ApiService from '../../../services/api'
//import { Translate } from 'react-i18nify'

class Plan extends React.Component {
    constructor(props) {
        super(props)

        this.selectPlan = this.selectPlan.bind(this)
        this.upgradePlan = this.upgradePlan.bind(this)

        this.state = {
            redirect: false,
            error: null,
            isFetching: false
        }
    }

    async selectPlan() {
        if (!window.confirm('Confirm plan?')) return

        this.setState({ isFetching: true, error: null })

        const response = await ApiService.post('/invoices', { planId: this.props.id })

        if (response.ok) {
            this.setState({ redirect: true })
        }
        else {
            const json = await response.json()
            this.setState({ redirect: false, error: json.error })
        }

        this.setState({ isFetching: false })
    }

    async upgradePlan() {
        if (!window.confirm('Confirm upgrade?')) return

        this.setState({ isFetching: true, error: null })

        const response = await ApiService.post('/invoices/upgrade', { planId: this.props.id })

        if (response.ok) {
            this.setState({ redirect: true })
        }
        else {
            const json = await response.json()
            this.setState({ redirect: false, error: json.error })
        }

        this.setState({ isFetching: false })
    }

    componentDidUpdate() {
        if (this.state.redirect) {
            this.props.history.push('/financial/invoices');
        }
    }

    render() {
        if (!this.props.user.plan_id) {
            return (
                <Col sm="12" md="6" lg="4">
                    <Card>
                        <div className="text-center">
                            <img src={this.props.img} className="mt-5 img-fluid" alt="Plan" />
                        </div>
                        <CardBody>
                            <CardTitle style={{ fontSize: 25 }} className="text-center">{this.props.name}</CardTitle>
                            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                            <ListGroup>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-currency-usd mr-1 text-secondary"></i> Price <span className="float-right">U$ {this.props.price}</span></ListGroupItem>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-currency-usd mr-1 text-secondary"></i> Membership Fee <span className="float-right">+U$ 10.00</span></ListGroupItem>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-robot mr-1 text-secondary"></i> Bots <span className="float-right">{this.props.bots}</span></ListGroupItem>
                            </ListGroup>
                            <div className="text-center">
                                {this.state.isFetching ? <Button className="mt-4" onClick={this.selectPlan} color="secondary" disabled>Creating Invoice...</Button> : <Button className="mt-4" onClick={this.selectPlan} color="secondary">Select Plan</Button>}
                            </div>
                        </CardBody>
                    </Card>
                </Col >
            )
        }
        else {
            return (
                <Col sm="12" md="6" lg="4">
                    <Card>
                        <div className="text-center">
                            <img src={this.props.img} className="mt-5 img-fluid" alt="Plan" />
                        </div>
                        <CardBody>
                            <CardTitle style={{ fontSize: 25 }} className="text-center">{this.props.name}</CardTitle>
                            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                            <ListGroup>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-currency-usd mr-1 text-secondary"></i> Price <span className="float-right">U$ {this.props.price}</span></ListGroupItem>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-currency-usd mr-1 text-secondary"></i> Membership Fee <span className="float-right">+U$ 10.00</span></ListGroupItem>
                                <ListGroupItem className="border-0 mt-3 p-0"><i className="mdi mdi-robot mr-1 text-secondary"></i> Bots <span className="float-right">{this.props.bots}</span></ListGroupItem>
                            </ListGroup>
                            <div className="text-center">
                                {this.state.isFetching ? <Button className="mt-4" onClick={this.upgradePlan} color="primary" disabled>Creating Invoice...</Button> : <Button className="mt-4" onClick={this.upgradePlan} color="primary">Upgrade</Button>}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        }
    }
}

export default withRouter(Plan);