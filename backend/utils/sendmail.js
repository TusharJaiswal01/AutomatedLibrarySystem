import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendEmail = async (to) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: "Information for Fine",
      text: "Hello dear , This is information mail From Vidhyasthali",
    };

    const res = await transporter.sendMail(mailOptions);

    console.log({ res });
    console.log('Email sent successfully', to);
    
    return { success: true, message: 'Email sent successfully!' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email.' };
  }
};

export default sendEmail;  
