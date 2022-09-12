import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Collapse } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Translate } from 'react-i18nify'

class Sidebar extends React.Component {

	constructor(props) {
		super(props);
		this.expandLogo = this.expandLogo.bind(this);
		this.activeRoute.bind(this);
		this.state = {
			network: this.activeRoute('/dashboard/network') !== '' ? true : false,
			financial: this.activeRoute('/dashboard/financial') !== '' ? true : false
		};
	}
	/*--------------------------------------------------------------------------------*/
	/*To Expand SITE_LOGO With Sidebar-Menu on Hover                                  */
	/*--------------------------------------------------------------------------------*/
	expandLogo() {
		document.getElementById("logobg").classList.toggle("expand-logo");
	}

	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? 'selected' : '';
	}

	activeExactRoute(routeName) {
		return this.props.location.pathname === routeName ? 'selected' : '';
	}

	render() {
		return (
			<aside className="left-sidebar" id="sidebarbg" data-sidebarbg={this.props.data.settings[0].sidebarbg} onMouseEnter={this.expandLogo} onMouseLeave={this.expandLogo}>
				<div className="scroll-sidebar">
					<PerfectScrollbar className="sidebar-nav">
						<Nav id="sidebarnav">

							<li className={this.activeExactRoute('/') + ' sidebar-item'}>
								<NavLink exact to="/" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-view-dashboard" />
									<span className="hide-menu"><Translate value="menu.dashboard" /></span>
								</NavLink>
							</li>

							<li className={this.activeRoute('/robot') + ' sidebar-item'}>
								<NavLink to="/robot" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-robot" />
									<span className="hide-menu"><Translate value="menu.robot" /></span>
								</NavLink>
							</li>

							<li className={this.activeRoute('/plans') + ' sidebar-item'}>
								<NavLink to="/plans" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-vector-polygon" />
									<span className="hide-menu"><Translate value="menu.plans" /></span>
								</NavLink>
							</li>

							<li className={this.activeRoute('/financial') + ' sidebar-item'}>
								<span data-toggle="collapse" className="sidebar-link has-arrow" aria-expanded={this.state.financial} onClick={() => this.setState({ financial: !this.state.financial })}>
									<i className="mdi mdi-currency-usd" />
									<span className="hide-menu"><Translate value="menu.financial.financial" /></span>
								</span>
								<Collapse isOpen={this.state.financial}>
								<ul className="first-level">
										<li className={this.activeRoute('/financial/invoices') + ' sidebar-item'}>
											<NavLink to="/financial/invoices" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.financial.invoices" /></span>
											</NavLink>
										</li>
									</ul>
									<ul className="first-level">
										<li className={this.activeRoute('/financial/payment') + ' sidebar-item'}>
											<NavLink to="/financial/payment" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.financial.payment" /></span>
											</NavLink>
										</li>
									</ul>
									<ul className="first-level">
										<li className={this.activeRoute('/financial/withdraw') + ' sidebar-item'}>
											<NavLink to="/financial/withdraw" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.financial.withdraw" /></span>
											</NavLink>
										</li>
									</ul>
									<ul className="first-level">
										<li className={this.activeRoute('/financial/transactions') + ' sidebar-item'}>
											<NavLink to="/financial/transactions" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.financial.transactions" /></span>
											</NavLink>
										</li>
									</ul>
								</Collapse>
							</li>

							<li className={this.activeRoute('/network') + ' sidebar-item'}>
								<span data-toggle="collapse" className="sidebar-link has-arrow" aria-expanded={this.state.network} onClick={() => this.setState({ network: !this.state.network })}>
									<i className="mdi mdi-file-tree" />
									<span className="hide-menu"><Translate value="menu.network.network" /></span>
								</span>
								<Collapse isOpen={this.state.network}>
									<ul className="first-level">
										<li className={this.activeRoute('/network/binary') + ' sidebar-item'}>
											<NavLink to="/network/binary" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.network.binary" /></span>
											</NavLink>
										</li>
									</ul>
									<ul className="first-level">
										<li className={this.activeRoute('/network/unilevel') + ' sidebar-item'}>
											<NavLink to="/network/unilevel" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.network.unilevel" /></span>
											</NavLink>
										</li>
									</ul>
									<ul className="first-level">
										<li className={this.activeRoute('/network/direct') + ' sidebar-item'}>
											<NavLink to="/network/direct" className="sidebar-link" activeClassName="active">
												<i className="mdi mdi-account-circle" />
												<span className="hide-menu"><Translate value="menu.network.direct" /></span>
											</NavLink>
										</li>
									</ul>
								</Collapse>
							</li>

							<li className={this.activeExactRoute('/careerplan') + ' sidebar-item'}>
								<NavLink exact to="/careerplan" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-star" />
									<span className="hide-menu"><Translate value="menu.career_plan" /></span>
								</NavLink>
							</li>

							<li className={this.activeExactRoute('/settings') + ' sidebar-item'}>
								<NavLink exact to="/settings" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-account-settings-variant" />
									<span className="hide-menu"><Translate value="menu.settings" /></span>
								</NavLink>
							</li>

							<li className={this.activeExactRoute('/faq') + ' sidebar-item'}>
								<NavLink exact to="/faq" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-comment-text" />
									<span className="hide-menu"><Translate value="menu.faq" /></span>
								</NavLink>
							</li>

							<li className="sidebar-item">
								<a href="https://drive.google.com/drive/folders/1rhzSf1tI6TVRaDuiXvmjHENWgvnhhbef?usp=sharing" target="_blank" rel="noopener noreferrer" className="sidebar-link">
									<i className="mdi mdi-folder-star" />
									<span className="hide-menu"><Translate value="menu.support_material" /></span>
								</a>
							</li>

							<li className={this.activeExactRoute('/support') + ' sidebar-item'}>
								<NavLink exact to="/support" className="sidebar-link" activeClassName="active">
									<i className="mdi mdi-help-circle-outline" />
									<span className="hide-menu"><Translate value="menu.support" /></span>
								</NavLink>
							</li>

						</Nav>
					</PerfectScrollbar>
				</div>
			</aside>
		);
	}
}
export default Sidebar;
