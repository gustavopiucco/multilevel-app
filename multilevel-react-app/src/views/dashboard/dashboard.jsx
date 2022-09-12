import React from "react"
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardTitle, CardBody } from 'reactstrap'
import ApiService from '../../services/api'
import Balance from "../../components/dashboard/balance/balance"
import NetworkBalance from "../../components/networkbalance/networkbalance"
import TotalProfit from "../../components/dashboard/totalprofit/totalprofit"
import CareerPoints from "../../components/dashboard/careerpoints/careerpoints"
import PlanCycle from "../../components/dashboard/plancycle/plancycle"
import AccountSummary from "../../components/dashboard/accountsummary/accountsummary"
import LeftTeam from '../../components/dashboard/binarysummary/leftteam'
import RightTeam from '../../components/dashboard/binarysummary/rightteam'
import News from "../../components/dashboard/news/news"
import Clock from "../../components/dashboard/clock/clock";
import imgModal from '../../assets/images/robot/results.jpg'
import imgTopBanner from '../../assets/images/background/top_banner.gif'

import withImportantStyle from 'react-with-important-style'
const BtcWidget = withImportantStyle('div')

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.toggleModal = this.toggleModal.bind(this)

		this.state = {
			user: null,
			modal: false,
			isFetching: true
		}
	}

	toggleModal() {
		this.setState({ modal: !this.state.modal })
	}

	async componentDidMount() {
		this.toggleModal()

		const response = await ApiService.get('/user')

		if (response.ok) {
			const json = await response.json()

			this.setState({ user: json.data });
		}

		this.setState({ isFetching: false })

		const script = document.createElement("script")

        script.src = "https://widgets.bitcoin.com/widget.js"
        script.async = true

        document.body.appendChild(script)
	}

	renderLoading() {
        return (
            <Card>
                <CardTitle className="border-bottom p-3 mb-0">
                    <i className="mdi mdi-view-dashboard mr-2"> </i>
                    Dashboard
                </CardTitle>
                <CardBody>
                    <h5 className="text-center">Loading...</h5>
                </CardBody>
            </Card>
        )
    }

	renderDashboard() {
		const total_users_left = this.state.user && this.state.user.total_users_left
		const total_users_right = this.state.user && this.state.user.total_users_right
		const total_points_left = this.state.user && this.state.user.total_points_left
		const total_points_right = this.state.user && this.state.user.total_points_right

		return (
			<React.Fragment>
				<Row>
					<Col md={12}>
						<News user={this.state.user} />
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Clock user={this.state.user} />
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<a href="/event"><img src={imgTopBanner} className="img-fluid mb-3" alt="Top Banner" /></a>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<NetworkBalance user={this.state.user} />
					</Col>
					<Col md={3}>
						<Balance user={this.state.user} />
					</Col>
					<Col md={3}>
						<TotalProfit user={this.state.user} />
					</Col>
					<Col md={3}>
						<CareerPoints user={this.state.user} />
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<LeftTeam total_users={total_users_left} total_points={total_points_left} />
					</Col>
					<Col md={3}>
						<RightTeam total_users={total_users_right} total_points={total_points_right} />
					</Col>
					<Col md={6}>
						<PlanCycle user={this.state.user} />
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<AccountSummary user={this.state.user} />
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<BtcWidget className="btcwdgt-news" bw-entries="10" bw-theme="light" style={{maxWidth: '100% !important'}}></BtcWidget>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<BtcWidget className="btcwdgt-chart" bw-theme="light" style={{maxWidth: '100% !important'}}></BtcWidget>
					</Col>
				</Row>

				{/* <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Results of the Week</ModalHeader>
					<ModalBody>
						<img src={imgModal} className="img-fluid" alt="Result of the Week" />
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.toggleModal}>
							Close
                    </Button>
					</ModalFooter>
				</Modal> */}

			</React.Fragment>
		)
	}

	render() {
		if (this.state.isFetching) {
			return this.renderLoading()
		}
		else {
			return this.renderDashboard()
		}
	}
}

export default Dashboard