import { hash } from "phc-argon2";
import { randomDatabase } from "../database.js";
import {decodeToken, generateToken} from "../../utils/tokenHandler.js";
import { mailVerifyHandle } from "../../utils/mailHandler.js";
import {refreshVerificationError} from "../../errors/refreshVerificationError.js";
import {retryError} from "../../errors/retryError.js";




export const newAccount = async (req, reply) => {
    if(req.session.get('user') === undefined) {
        if(req.method === "GET") {
            return reply.view('./templates/auth/signupform.ejs')
        }
        else if (req.method === "POST") {
            const user = req.body
            randomDatabase.prepare('INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)')
                .run(
                    user.email,
                    await hash(user.password),
                    user.first_name,
                    user.last_name
                )
            const storedUser = randomDatabase.prepare('SELECT * FROM users WHERE email = ?').get(user.email)
            const token =  await generateToken(storedUser,'verify', reply)
            await mailVerifyHandle(storedUser, token)

            return reply.redirect('/log_in/200')
        }
        else {
            throw new retryError ('Some kind of dark magic interfere with the process !')
        }
    }
    else {
        return reply.redirect('/')
    }
}

export const verifyAccount = async (req, reply) => {
    const token = await decodeToken(req.params.token)
    const user = randomDatabase.prepare('SELECT * FROM users WHERE email = ?').get(token.email)

    if (user !== undefined && (user.password === token.password)) {
        if(user.verification === 0) {
        randomDatabase.prepare('UPDATE users SET verification = ? WHERE email = ?')
            .run(
                1,
                token.email
            )
        return reply.redirect('/log_in/202')
        }
        return reply.redirect('/')
    }
    else  {
        const newtoken = await generateToken(user, 'verify', reply)
        await mailVerifyHandle(user, newtoken)
        throw new refreshVerificationError('Your account is not verified, a new verification link has been send, check your email')
    }
}