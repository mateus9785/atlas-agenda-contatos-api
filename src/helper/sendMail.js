const nodemailer = require('nodemailer');
const configNodemailer = require("./../config/nodemailer")
const emailTemplate = require("./../helper/emailTemplate")

async function sendMail(email, subject, text, link) {

  const transporter = nodemailer.createTransport(configNodemailer);

  const message = {
    from: '"Atlas - agenda de contatos" <noreply@atlas.com.br>',
    to: email,
    subject: subject,
    text: text,
    html: emailTemplate(subject, text, link)
  }

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.accepted);
}

module.exports = sendMail;
