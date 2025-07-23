const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

function sendVerificationEmail(user, token) {
    const verificationUrl = `http://${process.env.HOST}/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: 'Email Verification',
        html: `<h1>Email Verification</h1>
               <p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error(err);
        else console.log(`Verification email sent to ${user.email}`);
    });
}


module.exports = { sendVerificationEmail };