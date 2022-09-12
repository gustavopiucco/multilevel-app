import React from "react"
import { Card, CardBody, CardTitle } from 'reactstrap'
import { Translate } from 'react-i18nify'

class RightTeam extends React.Component {
    render() {
        return (
            <Card className="card-hover">
                <CardBody>
                    <CardTitle><Translate value="dashboard.right_team.title" /></CardTitle>
                    <div className="d-flex align-items-center mt-4">
                        <span className="display-4"><i className="mdi mdi-account-multiple"></i></span>
                        <div className="ml-auto">
                            <h2 className="mb-0">{this.props.total_users}</h2>
                            <span className="op-5"><Translate value="dashboard.right_team.total_users" /></span>
                        </div>
                    </div>

                    <div className="d-flex align-items-center mt-4">
                        <span className="display-4"><i className="mdi mdi-star"></i></span>
                        <div className="ml-auto">
                            <h2 className="mb-0">{this.props.total_points}</h2>
                            <span className="op-5"><Translate value="dashboard.right_team.total_points" /></span>
                        </div>
                    </div>
                </CardBody>
            </Card >
        )
    }
}

export default RightTeam