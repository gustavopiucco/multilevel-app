import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../components/header/header.jsx'
import Sidebar from '../components/sidebar/sidebar.jsx'
import Footer from '../components/footer/footer.jsx'
import Dashboard from '../views/dashboard/dashboard.jsx'
import Binary from '../views/network/binary.jsx'
import Unilevel from '../views/network/unilevel.jsx'
import Direct from '../views/network/direct.jsx'
import Plans from '../views/plans/plans.jsx'
import Invoices from '../views/financial/invoices.jsx'
import Payment from '../views/financial/payment.jsx'
import Withdraw from '../views/financial/withdraw'
import Transactions from '../views/financial/transactions.jsx'
import Settings from '../views/settings/settings.jsx'
import FAQ from '../views/faq/faq.jsx'
import Support from '../views/support/support.jsx'
import Robot from '../views/robot/robot.jsx'
import Event from '../views/event/event.jsx'
import CareerPlan from '../views/careerplan/careerplan.jsx';
import Team from '../views/team/team.jsx'
import Admin from '../views/admin/admin.jsx'

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.updateDimensions = this.updateDimensions.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			width: window.innerWidth,
			settings: [
				{
					theme: 'light',
					layout: 'vertical',
					dir: 'ltr',
					sidebartype: 'full',
					sidebarpos: 'fixed',
					headerpos: 'fixed',
					boxed: 'full',
					navbarbg: 'skin6',
					sidebarbg: 'skin6',
					logobg: 'skin6'
				}
			]
		};

		this.props.history.listen((location, action) => {
			if (window.innerWidth < 767 && document.getElementById('main-wrapper').className.indexOf('show-sidebar') !== -1) {
				document.getElementById('main-wrapper').classList.toggle('show-sidebar');
			}
		});
	}

	async componentDidMount() {
		window.addEventListener('load', this.updateDimensions);
		window.addEventListener('resize', this.updateDimensions);

		if (!localStorage.getItem('token')) {
			this.props.history.push('/login')
			return
		}
	}

	componentWillUnmount() {
		window.removeEventListener('load', this.updateDimensions);
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions() {
		let element = document.getElementById('main-wrapper');
		this.setState({
			width: window.innerWidth
		});

		switch (this.state.settings[0].sidebartype) {
			case 'full':
			case 'iconbar':
				if (this.state.width < 1170) {
					element.setAttribute('data-sidebartype', 'mini-sidebar');
					element.classList.add('mini-sidebar');
				} else {
					element.setAttribute('data-sidebartype', this.state.settings[0].sidebartype);
					element.classList.remove('mini-sidebar');
				}
				break;

			case 'overlay':
				if (this.state.width < 767) {
					element.setAttribute('data-sidebartype', 'mini-sidebar');
				} else {
					element.setAttribute('data-sidebartype', this.state.settings[0].sidebartype);
				}
				break;

			default:
		}
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		this.props.history.push('/login');
	}

	render() {
		return (
			<div id="main-wrapper" dir={this.state.settings[0].dir} data-theme={this.state.settings[0].theme} data-layout={this.state.settings[0].layout} data-sidebartype={this.state.settings[0].sidebartype} data-sidebar-position={this.state.settings[0].sidebarpos} data-header-position={this.state.settings[0].headerpos} data-boxed-layout={this.state.settings[0].boxed}>

				<Header data={this.state} logout={this.logout} />

				<Sidebar data={this.state} {...this.props} />

				<div className="page-wrapper d-block">
					<div className="page-content container-fluid">
						<Switch>
							<Route exact path="/" name="Dashboard" component={Dashboard} />
							<Route exact path="/event" name="Event" component={Event} />
							<Route exact path="/robot" name="Robot" component={Robot} />
							<Route exact path="/plans" name="Plans" component={Plans} />
							<Route exact path="/financial/invoices" name="Invoices" component={Invoices} />
							<Route exact path="/financial/payment" name="Invoices" component={Payment} />
							<Route exact path="/financial/withdraw" name="Withdraw" component={Withdraw} />
							<Route exact path="/financial/transactions" name="History" component={Transactions} />
							<Route exact path="/network/binary" name="Binary" component={Binary} />
							<Route exact path="/network/unilevel" name="Unilevel" component={Unilevel} />
							<Route exact path="/network/direct" name="Direct" component={Direct} />
							<Route exact path="/careerplan" name="Career Plan" component={CareerPlan} />
							<Route exact path="/settings" name="Settings" component={Settings} />
							<Route exact path="/faq" name="FAQ" component={FAQ} />
							<Route exact path="/support" name="Support" component={Support} />
							<Route exact path="/team" name="Team" component={Team} />
							<Route exact path="/admin" name="Admin" component={Admin} />
						</Switch>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}
export default Main;
