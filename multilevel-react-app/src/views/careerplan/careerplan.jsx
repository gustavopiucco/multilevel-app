import React from 'react'
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap'
import CareerPlanSingle from '../../components/dashboard/careerplansingle/careerplansingle'
import ApiService from '../../services/api'
import bronze from '../../assets/images/careerplan/bronze.png'
import silver from '../../assets/images/careerplan/silver.png'
import gold from '../../assets/images/careerplan/gold.png'
import ruby from '../../assets/images/careerplan/ruby.png'
import emerald from '../../assets/images/careerplan/emerald.png'
import diamond from '../../assets/images/careerplan/diamond.png'
import double_diamond from '../../assets/images/careerplan/double_diamond.png'
import triple_diamond from '../../assets/images/careerplan/triple_diamond.png'
import black_diamond from '../../assets/images/careerplan/black_diamond.png'

class CareerPlan extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            isFetching: false
        }
    }

    async componentDidMount() {
        this.setState({ isFetching: true })

        const response = await ApiService.get('/user')

        if (response.ok) {
            const json = await response.json()

            this.setState({ user: json.data })
        }

        this.setState({ isFetching: false })
    }

    renderLoading() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-star mr-2"> </i>
                    Career Plan
                </CardTitle>
                <CardBody>
                    <h5 className="text-center">Loading...</h5>
                </CardBody>
            </Card>
        )
    }

    renderCareerPlan() {
        const career_points = (this.state.user) ? this.state.user.career_points : 0

        return (
            <React.Fragment>
                <h5 className="mb-3">Career Plan</h5>
                <Row>
                    <Col md="12" lg="12">
                        <Card>
                        <CardTitle className="p-3 mb-0">
                            <i className="mdi mdi-help-circle-outline mr-2"> </i>
                            Info
                        </CardTitle>
                        <CardBody>
                            <p>Career Plan will be paid together with Binary/Robot/Residual everyday at 21:00 UTC. The new career plan system makes the automatic payment, so it is no longer necessary to request.</p>
                        </CardBody>
                        </Card>
                    </Col>
                    <CareerPlanSingle code="bronze" name="Bronze" prize="U$ 500" points={50000} careerPoints={career_points} img={bronze} />
                    <CareerPlanSingle code="silver" name="Silver" prize="U$ 1.000" points={100000} careerPoints={career_points} img={silver} />
                    <CareerPlanSingle code="gold" name="Gold" prize="U$ 2.500" points={250000} careerPoints={career_points} img={gold} />
                    <CareerPlanSingle code="ruby" name="Ruby" prize="U$ 5.000 + Macbook Pro" points={500000} careerPoints={career_points} img={ruby} rule="Must have 1 Silver direct on each side of the team." />
                    <CareerPlanSingle code="emerald" name="Emerald" prize="U$ 10.000 + International Trip" points={1000000} careerPoints={career_points} img={emerald} rule="Must have 1 Gold direct on each side of the team." />
                    <CareerPlanSingle code="diamond" name="Diamond" prize="Audi Q8" points={2500000} careerPoints={career_points} img={diamond} rule="Must have 1 Emerald direct on each side of the team." />
                    <CareerPlanSingle code="double_diamond" name="Double Diamond" prize="Nissan GT-R" points={5000000} careerPoints={career_points} img={double_diamond} rule="Must have 1 Diamond direct on each side of the team."/>
                    <CareerPlanSingle code="triple_diamond" name="Triple Diamond" prize="Ferrari 488 GTB" points={12500000} careerPoints={career_points} img={triple_diamond} rule="Must have 1 Double Diamond direct on each side of the team." />
                    <CareerPlanSingle code="black_diamond" name="Black Diamond" prize="Curti Zefhir Helicopter" points={50000000} careerPoints={career_points} img={black_diamond} rule="Must have 1 Triple Diamond direct on each side of the team." />
                </Row>
            </React.Fragment>
        )
    }

    render() {
        if (this.state.isFetching)
            return this.renderLoading()
        else
            return this.renderCareerPlan()
    }
}

export default CareerPlan
