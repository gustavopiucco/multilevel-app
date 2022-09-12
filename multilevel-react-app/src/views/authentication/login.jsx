import React from 'react'
import { Alert, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import ApiService from '../../services/api'
import logo from '../../assets/images/logo/logo_dark.png'
import business_background from '../../assets/images/background/business_background.jpg'

const backgroundStyle = {
	backgroundImage: 'url(' + business_background + ')',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundColor: '#ffffff'
}

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			credentials: {
				username: '',
				password: '',
			},
			isFetching: false,
			success: false,
			error: ''
		}
		this.onInputChange = this.onInputChange.bind(this)
		this.doLogin = this.doLogin.bind(this)
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			localStorage.removeItem('token')
		}
	}

	componentWillUpdate() {
		if (this.state.success) {
			//TODO: why using push throw an error and sidebar bug in mobile?
			//this.props.history.push('/') 
			window.location.href = '/'
		}
	}

	onInputChange(event) {
		const { name, value } = event.target
		const { credentials } = this.state
		this.setState({ credentials: { ...credentials, [name]: value } })
	}

	async doLogin(e) {
		e.preventDefault()

		this.setState({ isFetching: true })

		const response = await ApiService.post('/auth', this.state.credentials, false, true) 

		const json = await response.json()

		if (response.ok) {
			localStorage.setItem('token', json.data.token)
			localStorage.setItem('name', json.data.user.name)
			localStorage.setItem('email', json.data.user.email)

			this.setState({ success: true, error: '' })
		}
		else {
			this.setState({ success: false, error: json.error })
		}

		this.setState({ isFetching: false })
	}

	render() {
		return (
			<div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={backgroundStyle}>
				<div className="auth-box" style={{ borderRadius: 5 }}>
					<Row>
						<Col xs="12">
							<div className="p-4">
								<div className="text-center mb-4">
									<img src={logo} className="mb-3" width="250" alt="Multilevel" />
									<h4>Hi there, <span className="font-bold">Welcome</span></h4>
								</div>

								{!this.state.isFetching && this.state.error && <Alert color="danger">{this.state.error}</Alert>}

								{/* <Alert color="danger">We are in maintenance. we'll be back soon.</Alert> */}

								<Form className="mt-3" id="loginform" action="">
									<InputGroup className="mb-2" size="lg">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-user" />
											</InputGroupText>
										</InputGroupAddon>
										<Input type="username" id="username" name="username" value={this.state.username} onChange={this.onInputChange} placeholder="Username" />
									</InputGroup>

									<InputGroup className="mb-3" size="lg">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="ti-pencil" />
											</InputGroupText>
										</InputGroupAddon>
										<Input type="password" id="password" name="password" value={this.state.password} onChange={this.onInputChange} placeholder="Password" />
									</InputGroup>

									<Row className="mb-3">
										<Col xs="12">
											{this.state.isFetching ? <Button onClick={this.doLogin} color="primary" size="lg" type="submit" block disabled>Loading...</Button> : <Button onClick={this.doLogin} color="primary" size="lg" type="submit" block>Login</Button>}
										</Col>
									</Row>
									<div className="text-center mb-3">
										Forgot your password?
											<Link to="/reset-password" className="text-info ml-1">
											<b>Reset Password</b>
										</Link>
									</div>
									<div className="text-center">
										Don't have an account?
											<Link to="/register" className="text-info ml-1">
											<b>Register</b>
										</Link>
									</div>
								</Form>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default Login
