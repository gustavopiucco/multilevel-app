import React from "react";
import { Link } from 'react-router-dom';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import Invoice from '../../components/dashboard/invoice/invoice'
import ApiService from '../../services/api'

class Invoices extends React.Component {
    constructor(props) {
        super(props)

        this.reloadInvoices = this.reloadInvoices.bind(this)
        this.renderEmptyInvoices = this.renderEmptyInvoices.bind(this)

        this.userInvoices = []

        this.state = {
            isFetching: false
        }
    }

    async reloadInvoices() {
        this.setState({ isFetching: true }) //needed to be able to re-render

        const response = await ApiService.get('/user_invoices')

        if (response.ok) {
            const json = await response.json()
            this.userInvoices = json.data
        }

        this.setState({ isFetching: false })
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/user_invoices')

        if (response.ok) {
            const json = await response.json()
            this.userInvoices = json.data
        }

        this.setState({ isFetching: false })
    }

    renderLoading() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-tab-unselected mr-2"> </i>
                    Invoices
                </CardTitle>
                <CardBody>
                    <h5 className="text-center">Loading...</h5>
                </CardBody>
            </Card>
        )
    }

    renderEmptyInvoices() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-tab-unselected mr-2"> </i>
                    Invoices
                </CardTitle>
                <CardBody>
                    <h5 className="text-center">You have no invoice since you did not select any <Link to="/plans">plan</Link>.</h5>
                </CardBody>
            </Card>
        )
    }

    renderInvoices() {
        let hasWaitingPayment = false

        for (let invoice of this.userInvoices) {
            if (invoice.status === 'waiting_payment') {
                hasWaitingPayment = true
                break
            }
        }

        if (hasWaitingPayment) {
            return (
                <Row>
                    {this.userInvoices.map((invoice, i) => {
                        if (invoice.status === 'waiting_payment') {
                            return <Invoice reloadInvoices={this.reloadInvoices} invoice={invoice} key={i} />
                        }
                        else {
                            return null
                        }
                    })}
                </Row>
            )
        }
        else {
            return (
                <Row>
                    {this.userInvoices.map((invoice, i) => {
                        return <Invoice reloadInvoices={this.reloadInvoices} invoice={invoice} key={i} />
                    })}
                </Row>
            )
        }
    }

    render() {
        if (this.state.isFetching) {
            return this.renderLoading()
        }
        if (this.userInvoices.length === 0) {
            return this.renderEmptyInvoices()
        }
        else {
            return this.renderInvoices()
        }
    }
}

export default Invoices;