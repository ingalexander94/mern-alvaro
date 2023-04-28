const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.googlemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.PASSWORD_GMAIL,
  },
});

const emailActivateAccount = (to, token) => ({
  from: '"Authenticator App 👻" <no-reply@gmail.com>',
  to,
  subject: "Activate Account",
  html: `<p>Click the link <a href="${process.env.API_URL}/api/auth/activate?token=${token}">Activate</a></p>`,
});

const emailForgotPassword = (to, token) => ({
  from: '"Authenticator App 👻" <no-reply@gmail.com>',
  to,
  subject: "Forgot password",
  html: `<p>Click the link <a href="${process.env.ORIGIN_URL}/auth/recovery?token=${token}">Recovery</a></p>`,
});

module.exports = { transporter, emailActivateAccount, emailForgotPassword };
