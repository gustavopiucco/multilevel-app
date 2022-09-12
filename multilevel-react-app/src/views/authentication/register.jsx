import React from 'react'
import { Alert, Input, FormGroup, Form, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import CountriesOptions from '../../components/dashboard/inputs/countriesoptions'
import ApiService from '../../services/api'
import logo from '../../assets/images/logo/logo_dark.png'
import business_background from '../../assets/images/background/business_background.jpg'

const backgroundStyle = {
	backgroundImage: 'url(' + business_background + ')',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundColor: '#ffffff'
}

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: {
				inviteHash: this.props.match.params.invite_hash,
				sponsorName: '',
				name: '',
				country: '',
				email: '',
				username: '',
				confirmEmail: '',
				password: '',
				confirmPassword: ''
			},
			isFetching: false,
			isFetchingSponsor: false,
			success: false,
			error: ''
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.doRegister = this.doRegister.bind(this);
	}

	async componentDidMount() {
		if (localStorage.getItem('token')) {
			localStorage.removeItem('token')
		}

		const { invite_hash } = this.props.match.params;

		this.setState({ isFetchingSponsor: true });

		const response = await ApiService.get('/users_fullname/' + invite_hash)
		const json = await response.json()

		if (response.ok) {
			this.setState({ sponsorName: json.data.name })
		}
		else {
			this.setState({ success: false, error: 'Sponsor does not exist.' });
		}

		this.setState({ isFetchingSponsor: false });
	}

	onInputChange(event) {
		const { name, value } = event.target;
		const { newUser } = this.state;
		this.setState({ newUser: { ...newUser, [name]: value } });
	}

	async doRegister(event) {
		event.preventDefault();

		this.setState({ isFetching: true });

		const response = await ApiService.post('/users', this.state.newUser, false, true)

		if (response.ok) {
			this.setState({ success: true, error: '' })
		}
		else {
			const data = await response.json();
			this.setState({ success: false, error: data.error });
		}

		this.setState({ isFetching: false });
	}

	renderLoading() {
		return <h5 className="text-center">Loading...</h5>
	}

	renderLoginFormSponsorErrorMessage() {
		return (
			<React.Fragment>
				<Alert color="danger">Sponsor does not exist.</Alert>
				<p>We have identified that you're trying to sign up without specifying a sponsor.</p>
				<p>To be able to register in our system, you need to look for one of our associated sponsors.</p>
			</React.Fragment>
		)
	}

	renderLoginForm() {
		const { invite_hash } = this.props.match.params;

		if (!this.state.isFetching && this.state.success) {
			return <Alert color="success">Account created successfully. Login <Link to="/login">here</Link></Alert>
		}
		else {
			return (
				<React.Fragment>

					{!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}
					<Form className="mt-3" id="loginform">
						<Input type="hidden" name="invite_hash" value={invite_hash} />
						<h5 className="text-center">Sponsor Name: {this.state.sponsorName}</h5>
						<FormGroup className="mb-3">
							<Input type="text" value={this.state.name} onChange={this.onInputChange} name="name" id="name" placeholder="Name" bsSize="lg" />
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="select" onChange={this.onInputChange} placeholder="Country" name="country" id="country">
								<CountriesOptions />
							</Input>
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="email" value={this.state.email} onChange={this.onInputChange} name="email" id="email" placeholder="Email" bsSize="lg" />
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="email" value={this.state.confirmEmail} onChange={this.onInputChange} name="confirmEmail" id="confirmEmail" placeholder="Confirm Email" bsSize="lg" />
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="text" value={this.state.username} onChange={this.onInputChange} name="username" id="username" placeholder="Username" bsSize="lg" />
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="password" value={this.state.password} onChange={this.onInputChange} name="password" id="password" placeholder="Password" bsSize="lg" />
						</FormGroup>
						<FormGroup className="mb-3">
							<Input type="password" value={this.state.confirmPassword} onChange={this.onInputChange} name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" bsSize="lg" />
						</FormGroup>
						<Row className="mb-3 mt-3">
							<Col xs="12">
								{
									this.state.isFetching
										?
										<Button onClick={this.doRegister} className="text-uppercase" color="primary" size="lg" type="submit" block disabled>Loading...</Button>
										:
										<Button onClick={this.doRegister} className="text-uppercase" color="primary" size="lg" type="submit" block>Register</Button>
								}
							</Col>
						</Row>
					</Form>
				</React.Fragment>
			)
		}
	}

	verifyCallback = (recaptchaToken) => {
		this.setState({ newUser: {...this.state.newUser, recaptcha_token: recaptchaToken } })
	}

	render() {
		return (
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={backgroundStyle}>
				<div className="auth-box" style={{ borderRadius: 5, maxWidth: 600 }}>
					<Row>
						<Col xs="12">
							<div className="p-4">
								<div className="text-center mb-4 ">
									<img src={logo} className="mb-3" width="250" alt="Multilevel" />
									<h4>Hi there, <span className="font-bold">Welcome</span></h4>
								</div>

								{this.state.isFetchingSponsor ? this.renderLoading() : (this.state.sponsorName ? this.renderLoginForm() : this.renderLoginFormSponsorErrorMessage())}

								<div className="text-center">
									Already have an account?{' '}
									<Link to="/login" className="text-info ml-1">
										<b>Log in</b>
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Register;
