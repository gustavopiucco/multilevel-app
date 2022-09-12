import React from "react"
import { Col, Card, CardBody, CardTitle} from 'reactstrap'
import ApiService from '../../services/api'

class Ticket extends React.Component {
    constructor(props) {
        super(props)

        this.doBuyTicket = this.doBuyTicket.bind(this)

        this.state = {
            quantity: 0,
            success: false,
            error: null,
            isFetching: false
        }
    }
    
    async doBuyTicket(e) {
        e.preventDefault()

        alert(this.props.ticket)

        this.setState({ isFetching: true })

        const response = await ApiService.post('/user/buyticket', { ticket: this.props.ticket, quantity: this.state.quantity})

        if (response.ok) {
            this.setState({ success: true })
        }
        else {
            const json = await response.json()
            this.setState({ error: json.error, success: false })
        }

        this.setState({ isFetching: false })
    }

    render() {
        return (
            <Col md="6" lg="6">
                <Card>
                    <CardTitle className="p-3 mb-0">
                        <i className="mdi mdi-airplane mr-2"> </i>
                        {this.props.name}
                    </CardTitle>
                    <img width="100%" src={this.props.img} alt={this.props.name} />
                    <CardBody>
                        <table className="mt-4 table no-border mini-table m-t-20">
                            <tbody>
                                <tr>
                                    <td><i className="mr-2 mdi mdi-currency-usd"></i>Price</td>
                                    <td className="font-medium">U$ {this.props.price}</td>
                                </tr>
                                <tr>
                                    <td><i className="mr-2 mdi mdi-arrow-right-bold"></i>Type</td>
                                    <td className="font-medium">{this.props.type}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                        {!this.state.isFetching && this.state.success && <Alert color="success">Successful request.</Alert>}

                        {<div className="text-center">
                            {(this.state.isFetching) ? <Button color="success" disabled>Loading...</Button> : <Button onClick={this.doBuyTicket} color="success">Buy Ticket</Button>}
                        </div>} */}
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default Ticket