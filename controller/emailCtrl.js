const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async (data, req, res) => {
   const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
         user: process.env.MAIL_ID,
         pass: process.env.MP,
      },
   });

   async function main() {
      const info = await transporter.sendMail({
         from: '"F-Digitic 💻" <lebin642@gmail.com>',
         to: data.to,
         subject: data.subject,
         text: data.text,
         html: data.htm,
      });

      console.log("Message sent: %s", info.messageId);
   }

   main().catch(console.error);
})

module.exports = sendEmail;