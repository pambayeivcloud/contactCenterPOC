const nodemailer= require("nodemailer");

module.exports.sendEmail = async function(messageBody, messageTo){
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
    let message = {
        from: '"Ivory Cloud HD" <support@ivorycloud.com>',
        to: messageTo,
        subject: "Partner Query",
        text: messageBody,
    };
    
    let info = await transporter.sendMail(message);

    console.log('Message Sent:', info.messageId);
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));

}