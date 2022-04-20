const path = require('path')


const handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('email_content','views'),
        defaultLayout: false,
        },
    viewPath: path.resolve('email_content','views'),
    extName: ".handlebars",
}
// transporter.use('compile', hbs(handlebarOptions));

function generatorTemplate (originMail, destinationMail, userName, emailLink) {
    const mailOptions = {
        from: originMail,
        to: destinationMail,
        subject: 'Verification Mail',
        template: 'email-template',
        context: {
            name: userName,
            link: emailLink
        }

    };

    return [mailOptions, handlebarOptions];
}

module.exports = generatorTemplate
