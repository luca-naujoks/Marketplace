require('dotenv').config;
const nodemailer = require('nodemailer');

export async function sendMail(
  to: string,
  subject: string,
  secure_url: string,
  user_name: string,
) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.ICLOUD_EMAIL,
      pass: process.env.ICLOUD_PASSWORD,
    },
  });

  let options = {
    from: 'marketplace@bobby68.de',
    to: to,
    subject: subject,
    html: `
        <body>
    <h2>Hey ${user_name},</h2>
    <p>You recently requested to reset your password for your Marketplace account.</p>
    <p>Click below to reset it.</p>
    <a href="${secure_url}">${secure_url}</a>
    <p>If you did not request a password reset, please ignore this email or contact us under info@bobby68.de.</p>
    <p>Thanks,</p>
    <p>Your Marketplace Team</p>
</body>`,
  };

  transporter.sendMail(options);
}
