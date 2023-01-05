import { createTransport } from "nodemailer";



const transporter = createTransport({

    // copy past your transporter here
    /*host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'blaze.kulas72@ethereal.email',
        pass: 'dZuzgAJSbyBbk2FFNh'
    }*/
});



export const mailVerifyHandle = async (user, token) => {

        transporter.sendMail({
            to: user.email,
            from: 'blaze.kulas72@ethereal.email',     // transporter user
            subject: "Email verification",
            html: `click <a href=\"${token}\">here</a> to validate your account`
        })

    return true
}

export const mailResetHandle = async (user, token) => {

        transporter.sendMail({
            to: user.email,
            from: 'blaze.kulas72@ethereal.email',       // transporter user
            subject: "Password reset",
            html: `click <a href=\"${token}\">here</a> to reset your password`
        })

    return true
}