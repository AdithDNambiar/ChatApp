const nodemailer = require("nodemailer");

const sendEmail = async (to, password) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adithdnambiar.offl@gmail.com",
      pass: "hbnfizatgixmgvly"
    }
  });

  await transporter.sendMail({
    from: "Chat App",
    to: to,
    subject: "Your Chat App Password",
    text: `Your password is: ${password}`
  });

};

module.exports = sendEmail;