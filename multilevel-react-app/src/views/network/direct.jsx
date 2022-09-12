import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import ApiService from '../../services/api'
import DirectNetwork from '../../components/dashboard/network/direct'

class Direct extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            network: [],
            isFetching: false
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/direct')

        const json = await response.json()

        this.setState({ network: json.data, isFetching: false })
    }

    render() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-border-all mr-2"> </i>
                    Direct Network
                </CardTitle>
                <CardBody className="border-top">
                    {this.state.isFetching ? <h5 className="text-center">Loading...</h5> : <DirectNetwork network={this.state.network} />}
                </CardBody>
            </Card>
        )
    }
}

export default Direct