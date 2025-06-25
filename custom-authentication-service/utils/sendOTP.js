import nodemailer from 'nodemailer';

const sendOTP = async (email, otp) => {

  console.log(` OTP for ${email}: ${otp}`);

  // Create a transporter (using Gmail SMTP here)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,   
      pass: process.env.EMAIL_PASS,  
    },
  });

  // Mail options
  const mailOptions = {
    from: `"Auth Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
    html: `<p>Hi,</p><p>Your OTP code is: <strong>${otp}</strong></p><p>This code is valid for 5 minutes.</p>`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(` OTP sent to ${email}`);
  } catch (error) {
    console.error(' Email sending failed:', error.message);
  }
};

export default sendOTP;
