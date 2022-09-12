import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import ReactClock from 'react-live-clock';
import { Translate } from 'react-i18nify'

class Clock extends React.Component {
    render() {
        return (
            <Card className="card-hover mb-3">
                <CardBody>
                    <CardTitle><Translate value="dashboard.server_time" /></CardTitle>
                    <h5 className="text-center">
                        <i className="mdi mdi-clock mr-1"></i>
                        <ReactClock format={'HH:mm:ss ddd, D MMM YYYY'} ticking={true} timezone={'UTC'} /> UTC
                    </h5>
                </CardBody>
            </Card>
        )
    }
}

export default Clock