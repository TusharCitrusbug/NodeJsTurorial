const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//     to: 'test@example.com', // Change to your recipient
//     from: 'test@example.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }

exports.sendMail = (msg) => {
    msg.from = process.env.SENDER_ID
    console.log(msg);
    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
}