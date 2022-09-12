const API_KEY = 'key-e3c527412d0a8ace62c33791a1ab3dbc'
const DOMAIN = 'mail.Multilevel.com'
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN })

const from = 'Multilevel <no-reply@mail.Multilevel.com>'

function registrationSuccessful(toEmail, username) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Welcome to Multilevel',
        html: `
        <p><strong>Welcome to Multilevel!</strong></p>
        <p>Your registration was successful.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p>Sign in now at <a href="https://dashboard.Multilevel.com/login">https://dashboard.Multilevel.com/login</a></p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function invoiceCreated(toEmail, username, planName, btcAddress, totalBtc) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'New invoice created',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>You just created a new invoice.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>BTC Address:</strong> ${btcAddress}</p>
        <p><strong>BTC Amount:</strong> ${totalBtc}</p>
        <p>Pay the exact amount in Bitcoin to avoid problems with the automatic payment processor.</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function invoiceWaitingConfirmations(toEmail, username, planName) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Invoice Waiting Confirmations',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>Your payment has been confirmed, but we have to wait until we receive the 3 confirmations necessary to activate your plan. Once we have received these 3 confirmations you will receive an e-mail from us notifying you.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Plan:</strong> ${planName}</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function invoicePaymentConfirmed(toEmail, username, planName) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Invoice Payment Confirmed',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>Your payment has been confirmed with success.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Plan:</strong> ${planName}</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function passwordReset(toEmail, username, newPassword) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Password Reset',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>You have requested a password reset.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>New password:</strong> ${newPassword}</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function careerPlanCongratulations(toEmail, username, levelName) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Career Plan',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>Congratulations! You made it to the ${levelName} Level in the career plan. You reward was deposited in your account. You can withdraw it on Tuesdays and Thursdays.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Level:</strong> ${levelName}</p>
        <p>We ask your authorization to show your picture. If you agree then send a picture of yourself to contact@Multilevel.com</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function withdrawPaymentConfirmed(toEmail, username, amount) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Withdraw - Payment Confirmed',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>Your withdraw was processed successfully.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Amount:</strong> U$ ${amount}</p>
        <p>Your payment has been processed with 888 Coin. To access 888 Crypto Trade exchange, please visit <a href="https://888cryptotrade.com">https://888cryptotrade.com</a>. You have received a new password from 888 Crypto Trade. If you need to recover the password go to <a href="https://888cryptotrade.com/recoverpassword">https://888cryptotrade.com/recoverpassword</a></p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

// function withdrawPaymentConfirmed(toEmail, username, amount, txid) {
//     const data = {
//         from: from,
//         to: toEmail,
//         subject: 'Withdraw - Payment Confirmed',
//         html: `
//         <p><strong>Multilevel</strong></p>
//         <p>Your withdraw was processed successfully.</p>
//         <p><strong>Username:</strong> ${username}</p>
//         <p><strong>Amount:</strong> U$ ${amount}</p>
//         <p><strong>Transaction:</strong></p> <a href="https://www.blockchain.com/en/btc/tx/${txid}">https://www.blockchain.com/en/btc/tx/${txid}</a>
//         `
//     }

//     if (process.env.NODE_ENV != 'development') {
//         mailgun.messages().send(data, (error, body) => {
//             //console.log(body);
//         })
//     }
// }

function requestPin(toEmail, username, pin) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Multilevel - New PIN Requested',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>A new PIN has been requested. Use this PIN to change your settings. This PIN is valid for 30 minutes.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>PIN:</strong> ${pin}</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

function usernameChange(toEmail, username, newUsername) {
    const data = {
        from: from,
        to: toEmail,
        subject: 'Multilevel - Username change',
        html: `
        <p><strong>Multilevel</strong></p>
        <p>Due to some duplications in our system, we need to change your username from ${username} to ${newUsername}</p>
        <p>If you want to change your username, send an email to contact@Multilevel.com</p>
        <p><strong>New Username:</strong> ${newUsername}</p>
        `
    }

    // if (process.env.NODE_ENV != 'development') {
    //     mailgun.messages().send(data, (error, body) => {
    //         //console.log(body);
    //     })
    // }
}

module.exports = {
    registrationSuccessful,
    invoiceCreated,
    invoicePaymentConfirmed,
    invoiceWaitingConfirmations,
    passwordReset,
    careerPlanCongratulations,
    withdrawPaymentConfirmed,
    requestPin,
    usernameChange
}