import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import profilephoto from '../../assets/images/users/default_avatar.jpg'
import logo from '../../assets/images/logo/logo.png'
import logoText from '../../assets/images/logo/logo_text.png'
import { I18n } from 'react-i18nify'

class Header extends React.Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.showMobilemenu = this.showMobilemenu.bind(this)
		this.sidebarHandler = this.sidebarHandler.bind(this)
		this.state = {
			isOpen: false
		}
	}

	componentDidMount() {

	}

	changeLanguage(language) {
		localStorage.setItem('language', language)
		I18n.setLocale(language)
	}

	/*--------------------------------------------------------------------------------*/
	/*To open NAVBAR in MOBILE VIEW                                                   */
	/*--------------------------------------------------------------------------------*/
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}
	/*--------------------------------------------------------------------------------*/
	/*To open SIDEBAR-MENU in MOBILE VIEW                                             */
	/*--------------------------------------------------------------------------------*/
	showMobilemenu() {
		document.getElementById('main-wrapper').classList.toggle('show-sidebar')
	}
	sidebarHandler = () => {
		let element = document.getElementById('main-wrapper')
		switch (this.props.data.settings[0].sidebartype) {
			case 'full':
			case 'iconbar':
				element.classList.toggle('mini-sidebar')
				if (element.classList.contains('mini-sidebar')) {
					element.setAttribute('data-sidebartype', 'mini-sidebar')
				} else {
					element.setAttribute('data-sidebartype', this.props.data.settings[0].sidebartype)
				}
				break

			case 'overlay':
			case 'mini-sidebar':
				element.classList.toggle('full')
				if (element.classList.contains('full')) {
					element.setAttribute('data-sidebartype', 'full')
				} else {
					element.setAttribute('data-sidebartype', this.props.data.settings[0].sidebartype)
				}
				break

			default:
		}
	}

	render() {
		return (
			<header className="topbar navbarbg" data-navbarbg={this.props.data.settings[0].navbarbg}>
				<Navbar className={'top-navbar ' + (this.props.data.settings[0].navbarbg === 'skin6' ? 'navbar-light' : 'navbar-dark')} expand="md">
					<div className="navbar-header" id="logobg" data-logobg={this.props.data.settings[0].logobg}>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<span className="nav-toggler d-block d-md-none" onClick={this.showMobilemenu}>
							<i className="ti-menu ti-close" />
						</span>
						{/*--------------------------------------------------------------------------------*/}
						{/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
						{/*--------------------------------------------------------------------------------*/}
						<NavbarBrand>
							<b className="logo-icon">
								<img width="50" height="30" src={logo} alt="homepage" className="dark-logo" />
								<img width="50" height="30" src={logo} alt="homepage" className="light-logo" />
							</b>
							<span className="logo-text">
								<img width="140" height="50" src={logoText} alt="homepage" className="dark-logo" />
								<img width="140" height="50" src={logoText} className="light-logo" alt="homepage" />
							</span>
						</NavbarBrand>
						{/*--------------------------------------------------------------------------------*/}
						{/* Mobile View Toggler  [visible only after 768px screen]                         */}
						{/*--------------------------------------------------------------------------------*/}
						<span className="topbartoggler d-block d-md-none" onClick={this.toggle}>
							<i className="ti-more" />
						</span>
					</div>
					<Collapse
						className="navbarbg"
						isOpen={this.state.isOpen}
						navbar
						data-navbarbg={this.props.data.settings[0].navbarbg}
					>
						<Nav className="float-left" navbar>
							<NavItem>
								<NavLink href="#" className="d-none d-md-block" onClick={this.sidebarHandler}>
									<i className="ti-menu" />
								</NavLink>
							</NavItem>
						</Nav>
						<Nav className="ml-auto float-right" navbar>
							{/*--------------------------------------------------------------------------------*/}
							{/* Start Profile Dropdown                                                         */}
							{/*--------------------------------------------------------------------------------*/}
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav>Languages <i className="fa fa-angle-down" /></DropdownToggle>
								<DropdownMenu>
								<DropdownItem onClick={() => this.changeLanguage('english')}><i className="flag-icon flag-icon-gb" /> English</DropdownItem>
								<DropdownItem onClick={() => this.changeLanguage('chinese')}><i className="flag-icon flag-icon-cn" /> 中文</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>

							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret className="pro-pic">
									<img src={profilephoto} alt="user" className="rounded-circle" width="31" />
								</DropdownToggle>
								<DropdownMenu right className="user-dd">
									<span className="with-arrow">
										<span className="bg-primary" />
									</span>
									<div className="d-flex no-block align-items-center p-3 mb-2">
										<div className="">
											<img src={profilephoto} alt="user" className="rounded-circle" width="60" />
										</div>
										<div className="ml-2">
											<h4 className="mb-0">{localStorage.getItem('name')}</h4>
											<p className=" mb-0">{localStorage.getItem('email')}</p>
										</div>
									</div>
									<DropdownItem divider />
									<Link to="/settings">
										<DropdownItem>
											<i className="ti-settings mr-1 ml-1" /> Settings
										</DropdownItem>
									</Link>
									<DropdownItem divider />
									<DropdownItem onClick={this.props.logout}>
										<i className="fa fa-power-off mr-1 ml-1" /> Logout
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							{/*--------------------------------------------------------------------------------*/}
							{/* End Profile Dropdown                                                           */}
							{/*--------------------------------------------------------------------------------*/}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		)
	}
}
export default Header
