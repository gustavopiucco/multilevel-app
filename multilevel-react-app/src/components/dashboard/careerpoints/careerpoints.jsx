import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Translate } from 'react-i18nify'

class CareerPoints extends React.Component {
    render() {
        return (
            <Card className="bg-info text-white card-hover">
                <CardBody className="">
                    <CardTitle><Translate value="dashboard.career_points.title" /></CardTitle>
                    <div className="d-flex align-items-center mt-4">
                        <span className="display-4"><i className="mdi mdi-star-circle"></i></span>
                        <div className="ml-auto">
                            <h2 className="mb-0"><i className="ti-arrow-up mr-3"></i>{this.props.user ? this.props.user.career_points : ''}</h2>
                            <span className="op-5"><Translate value="dashboard.career_points.description" /></span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default CareerPoints