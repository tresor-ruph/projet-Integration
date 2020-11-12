const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  //let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "HelpRecover2020@gmail.com",
      pass: "gK6p2wm!d"
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"HelpRecover" <HelpRecover2020@gmail.com>', // sender address
    to: "inconnu12345612@gmail.com", // list of receivers
    subject: "Vérification email", // Subject line
    text: "Vérifiez votre email", // plain text body
    html: "<b>Vérifiez votre email : <a href='http://localhost:19006'>redirection</a></b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);