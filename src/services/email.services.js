require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

module.exports = transporter;


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail,name){
    const subject ='Welcome  to Bank Ledger!';
    const text=`Hello ${name},\n\n Thank you for registering at Bank Ledger.
    We are excited to have you on board!\n\n Best regards,\n Bank Ledger Team`;
    const html = `<div> <p>Welcome to Bank Ledger, ${name}!</p><p>Thank you for registering at Bank Ledger.</p>
     <p>We are excited to have you on board!</p>
      <p>Best regards,<br>Bank Ledger Team</p></div>`;

    await sendEmail(userEmail, subject, text, html);
}


async function sendTransacionEmail(userEmail,name,amount, toAccount ){
    const subject ='Transaction successful!';
    const text=`Hello ${name},\n\n Your transaction of $${amount} to account ${toAccount} was successful.\n\n Best regards,\n Bank Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>Bank Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
  }

async function sendFailedTransacionEmail(userEmail,name,amount, toAccount ){
    const subject ='Transaction failed!';
    const text=`Hello ${name},\n\n Your transaction of $${amount} to account ${toAccount} failed.\n\n Best regards,\n Bank Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} failed.</p><p>Best regards,<br>Bank Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}
module.exports = {
    sendRegistrationEmail,
    sendTransacionEmail,
    sendFailedTransacionEmail
}; 