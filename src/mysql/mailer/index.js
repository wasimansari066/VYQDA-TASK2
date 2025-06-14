const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.MAIL_PASSWORD,
    },
});

module.exports = mailer;
