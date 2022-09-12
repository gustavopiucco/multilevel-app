import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Main from './layouts/main.jsx'
import Reset from './views/authentication/reset'
import Login from './views/authentication/login'
import Register from './views/authentication/register'
import { I18n } from 'react-i18nify'
import translations from './translations.json'
import './assets/scss/style.css'

I18n.setTranslations(translations)

const language = localStorage.getItem('language')

if (language) {
	I18n.setLocale(language)
}
else {
	I18n.setLocale('english')
	localStorage.setItem('language', 'english')
}

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path="/reset-password" name="Reset Password" component={Reset} />
			<Route exact path="/login" name="Login" component={Login} />
			<Route exact path="/register/:invite_hash?" name="Register" component={Register} />
			<Route path="/" name="Main" component={Main} />
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
)