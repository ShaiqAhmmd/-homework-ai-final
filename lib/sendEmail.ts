import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export async function sendProUpgradeEmail(to: string, userName: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: '🎉 Congrats! You’ve been upgraded to Homework AI Pro',
    text: `Hi ${userName},

Congratulations! You have earned a Pro membership on Homework AI by referring 3 friends.

Enjoy unlimited AI power and premium features.

Thank you for being part of our community!

Best,
The Homework AI Team`,
  }

  await transporter.sendMail(mailOptions)
}