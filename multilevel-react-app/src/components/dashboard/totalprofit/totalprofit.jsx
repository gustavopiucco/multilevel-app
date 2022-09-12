import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Translate } from 'react-i18nify'

class TotalProfit extends React.Component {
    render() {
        return (
            <Card className="bg-danger text-white card-hover">
                <CardBody className="">
                    <CardTitle><Translate value="dashboard.total_profit.title" /></CardTitle>
                    <div className="d-flex align-items-center mt-4">
                        <span className="display-4"><i className="mdi mdi mdi-shopping"></i></span>
                        <div className="ml-auto">
                            <h2 className="mb-0"><i className="ti-arrow-up mr-3"></i>U$ {this.props.user ? this.props.user.total_profit : ''}</h2>
                            <span className="op-5"><Translate value="dashboard.total_profit.description" /></span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default TotalProfit