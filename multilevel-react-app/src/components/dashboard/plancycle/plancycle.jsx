import React from "react"
import { Row, Col, Card, CardBody, CardTitle, Progress } from 'reactstrap'
import { Translate } from 'react-i18nify'

class PlanCycle extends React.Component {
    render() {
        const plan_id = this.props.user && this.props.user.plan_id
        const total_plan_cycle = this.props.user && this.props.user.total_plan_cycle
        let plan_price

        switch (plan_id) {
            case 1:
                plan_price = 100
                break
            case 2:
                plan_price = 500
                break
            case 3:
                plan_price = 1000
                break
            case 4:
                plan_price = 2500
                break
            case 5:
                plan_price = 5000
                break
            case 6:
                plan_price = 12500
                break
            case 7:
                plan_price = 25000
                break
            case 8:
                plan_price = 50000
                break
            default:
                plan_price = null
        }

        plan_price = plan_price * 3 //total user can earn

        let percentage = (total_plan_cycle / plan_price * 100)

        if (isNaN(percentage)) {
            percentage = 0
        }

        return (
            <React.Fragment>
                <Card className="card-hover">
                    <CardBody>
                        <CardTitle><Translate value="dashboard.plan_cycle.title" /></CardTitle>
                        <div className="pt-3 text-center">
                            <i className="mdi mdi-file-chart text-primary display-4 d-block"></i>
                            <Progress multi className="mt-3">
                                <Progress bar color="primary" value={percentage} />
                            </Progress>
                            <Row className="mt-4">
                                <Col xs="6" md="12" lg="6" className="border-right text-right">
                                    <h4 className="mb-0 font-medium">U$ {total_plan_cycle}</h4><Translate value="dashboard.plan_cycle.progress" /> ({(percentage * 3).toFixed(2)}%)
                                </Col>
                                <Col xs="6" md="12" lg="6" className="text-md-left">
                                    <h4 className="mb-0 font-medium">U$ {(plan_price).toFixed(2)}</h4><Translate value="dashboard.plan_cycle.goal" /> (300%)
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default PlanCycle;