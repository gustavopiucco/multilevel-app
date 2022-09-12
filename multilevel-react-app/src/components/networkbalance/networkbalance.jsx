import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Translate } from 'react-i18nify'

class NetworkBalance extends React.Component {
    render() {
        return (
            <Card className="bg-success text-white card-hover">
                <CardBody>
                    <CardTitle><Translate value="dashboard.network_balance.title" /></CardTitle>
                    <div className="d-flex align-items-center mt-4">
                        <span className="display-4"><i className="mdi mdi-currency-usd"></i></span>
                        <div className="ml-auto">
                            <h2 className="mb-0"><i className="ti-arrow-up mr-3"></i>U$ {this.props.user ? this.props.user.network_balance : ''}</h2>
                            <span className="op-5"><Translate value="dashboard.network_balance.description" /></span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default NetworkBalance