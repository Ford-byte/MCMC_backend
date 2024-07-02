const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const { addData, getData } = require('../model/oneTimePassModel');

dotenv.config();

const EMAIL = process.env.EMAIL || 'c.iyac123@gmail.com';
const PASSWORD = process.env.EPASS || 'gjfjlcpjasperwjk';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'trial@gmail.com';

async function addOtp(req, res) {
    const randomNumbers = [];

    do {
        const randomNumber = Math.floor(Math.random() * 1000001);
        randomNumbers.push(randomNumber);
    } while (randomNumbers < 100001);

    try {
        addData(randomNumbers, (error, result) => {
            if (error) {
                console.error("Error adding data:", error);
            } else {
                console.log("Data added successfully:");
            }
        });
    } catch (error) {
        console.error("Caught an error:", error);
        return 0;
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: EMAIL,
            to: RECIPIENT_EMAIL,
            subject: 'OTP',
            html: `Dear User,
<br>
For your security, we have generated a One-Time Password (OTP) for your recent login attempt. <br>Please use the following OTP to complete your authentication process:
<br>
Your One-Time Password (OTP) is: <b>${randomNumbers}</b>
<br>
This OTP is valid for the next 10 minutes. If you did not request this OTP, please disregard this message and ensure the security of your account by changing your password immediately.
<br>
Thank you for your attention to this matter. If you have any questions or encounter any issues, please contact our support team.
<br>
Best regards,
<br>
[MCMC CHURCH] Support Team`
        });

        console.log("Message Sent:", info.messageId);
    } catch (e) {
        console.error('Error occurred:', e.message);
        if (e.response) {
            console.error('Response:', e.response);
        }
    }
    res.status(200).json({ success: true, message: 'Success!', data: result });
}

async function getOtp(req, res) {
    try {
        getData((error, result) => {
            if (error) {
                res.status(500).json({ success: false, message: 'Retrieval Data Unsuccessful!' });
            } else {
                res.status(200).json({ success: true, message: 'Success!', data: result });
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Retrieval Data Unsuccessful!' });
    }
}

module.exports = { addOtp, getOtp };
