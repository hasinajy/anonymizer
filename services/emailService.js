const nodemailer = require("nodemailer");
const { generateTemplate } = require("../utils/emailTemplate");

const emailPin = async (to, pin) => {
    const options = {
        from: `"Anonymizer Service" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: "PIN confirmation",
        html: generateTemplate("pin", { pin }),
    };

    return await sendEmail(options);
};

const sendSignUpValidation = async (to, data) => {
    const options = {
        from: `"Anonymizer Service" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: "Sign up validation",
        html: generateTemplate("link", data)
    };

    return await sendEmail(options);
};

const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    return await transporter.sendMail(mailOptions);
};

module.exports = {
    emailPin,
    sendSignUpValidation
}