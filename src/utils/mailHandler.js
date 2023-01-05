import { createTransport } from "nodemailer";



const transporter = createTransport({

    // copy past your transporter here
    //you need to set off SSL security or set up certificate, if not you will an error
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zella.graham80@ethereal.email',
            pass: '7B4CRnpHNDA1StYBY6'
        }

});



export const mailVerifyHandle = async (user, token) => {

        transporter.sendMail({
            to: user.email,
            from: 'zella.graham80@ethereal.email',     // transporter user
            subject: "Email verification",
            html: `click <a href=\"${token}\">here</a> to validate your account`
        })

    return true
}

export const mailResetHandle = async (user, token) => {

        transporter.sendMail({
            to: user.email,
            from: 'zella.graham80@ethereal.email',       // transporter user
            subject: "Password reset",
            html: `click <a href=\"${token}\">here</a> to reset your password`
        })

    return true
}