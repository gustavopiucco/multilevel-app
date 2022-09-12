import React from "react"
import { Col, Card, CardBody, CardTitle, Progress, Alert } from 'reactstrap'
import ApiService from '../../../services/api'

class CareerPlanSingle extends React.Component {
    constructor(props) {
        super(props)

        this.doRequest = this.doRequest.bind(this)

        this.state = {
            success: false,
            error: null,
            isFetching: false
        }
    }

    async doRequest(e) {
        e.preventDefault()

        this.setState({ isFetching: true })

        const response = await ApiService.post('/careerplan', { code: this.props.code })

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
        const pointsNeeded = parseFloat(this.props.points)
        const careerPoints = parseFloat(this.props.careerPoints)
        let percentage = (careerPoints / pointsNeeded) * 100
        
        if (percentage > 100) percentage = 100

        percentage = percentage.toFixed(2)

        return (
            <Col md="6" lg="4">
                <Card>
                    <CardTitle className="p-3 mb-0">
                        <i className="mdi mdi-star mr-2"> </i>
                        {this.props.name}
                    </CardTitle>
                    <img width="100%" src={this.props.img} alt={this.props.name} />
                    <CardBody>
                        <table className="mt-4 table no-border mini-table m-t-20">
                            <tbody>
                                <tr>
                                    <td><i className="mr-2 mdi mdi-star"></i>Prize</td>
                                    <td className="font-medium">{this.props.prize}</td>
                                </tr>
                                <tr>
                                    <td><i className="mr-2 mdi mdi-star"></i>Points Needed</td>
                                    <td className="font-medium">{this.props.points}</td>
                                </tr>
                                <tr>
                                    <td><i className="mr-2 mdi mdi-star"></i>Career Points</td>
                                    <td className="font-medium">{this.props.careerPoints}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="text-center"><small>{this.props.rule}</small></p>
                        <p className="text-center">Progress {percentage}%</p>
                        <Progress multi className="mt-3 mb-3">
                            <Progress bar color="success" value={percentage} />
                        </Progress>

                        {!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}
                        {!this.state.isFetching && this.state.success && <Alert color="success">Successful request.</Alert>}

                        {/* <div className="text-center">
                            {(this.state.isFetching) ? <Button onClick={this.doRequest} color="success" disabled>Loading...</Button> : <Button onClick={this.doRequest} color="success">Request</Button>}
                        </div> */}
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

export default CareerPlanSingle;