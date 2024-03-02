import nodemailer from "nodemailer";

export const sendEmail = async ({ email, name, otp }) => {
  console.log(email, name, otp);
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: `Welcome to our platform ${name}`,
    text: `Your 4 digit code is ${otp}`,
  };
  await transporter.sendMail(mailOptions);
};
