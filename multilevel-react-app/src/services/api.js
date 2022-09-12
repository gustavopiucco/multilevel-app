//import jwt from 'jsonwebtoken';

class ApiService {
    static token() {
        return localStorage.getItem('token')
    }

    static async get(endpoint, authRequired = true) {
        let headers

        if (authRequired) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token()
            }
        }
        else {
            headers = {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
            method: 'GET',
            headers: headers
        })

        //TODO: handle 401 unauthorized access better
        if (response.status === 401)
            window.location.href = '/login'

        return response;
    }

    static async post(endpoint, body, authRequired = true, recaptchaRequired = false) {
        let headers

        if (recaptchaRequired)
            body.recaptcha_token = await window.grecaptcha.execute('6LfUPqIUAAAAAKXFQfNx3SUc27QMyHVforP5eCoE')

        if (authRequired) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token(),
            }
        }
        else {
            headers = {
                'Content-Type': 'application/json',
            }
        }

        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })

        //TODO: handle 401 unauthorized access better
        if (response.status === 401)
            window.location.href = '/login'

        return response
    }

    static async put(endpoint, body, authRequired = true) {
        let headers

        if (authRequired) {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token()
            }
        }
        else {
            headers = {
                'Content-Type': 'application/json'
            }
        }

        const response = await fetch(process.env.REACT_APP_API_URL + endpoint, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        })

        //TODO: handle 401 unauthorized access better
        if (response.status === 401)
            window.location.href = '/login'

        return response
    }
}

export default ApiService