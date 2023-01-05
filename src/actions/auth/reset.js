import {randomDatabase} from "../database.js";
import {unknownUser} from "../../errors/unknownUser.js";
import {decodeToken, generateToken} from "../../utils/tokenHandler.js";
import {mailResetHandle} from "../../utils/mailHandler.js";
import {hash} from "phc-argon2";


export async function forgotPassword (req, reply) {

    if(req.session.get('user') === undefined && req.method === 'GET') {
        return reply.view('./templates/auth/forgotpassword.ejs')
    }

    else if(req.session.get('user') === undefined && req.method === 'POST') {

    const email = req.body.email
        const user = randomDatabase.prepare ('SELECT * FROM users WHERE email = ?').get(email)
        if(user === undefined) {
            throw new unknownUser("User does not exist.")
        }
        else {
            const token = await generateToken(user, 'reset', reply)
            await mailResetHandle(user, token)

            return reply.view('./templates/auth/forgotpassword.ejs', {
                note: 'Reset mail has been sent, check your email.',
                status: 'is-success',
            })
        }
    }
    throw new Error('404')
}


export async function resetPassword (req, reply) {

    if(req.session.get('user') === undefined && req.method === 'GET') {
        const token = await req.params.token
        const usertoken = await decodeToken(req.params.token)
        const user = randomDatabase.prepare('SELECT * FROM users WHERE email = ?').get(usertoken.email)
        if(user !== undefined && user.password === usertoken.password) {
            return reply.view('./templates/auth/resetpassword.ejs', {
                token,
                usertoken
            })
        }
        throw new Error('404')
    }



    else if(req.session.get('user') === undefined && req.method === 'POST') {

        const usertoken = await decodeToken(req.params.token)
        const user = randomDatabase.prepare('SELECT * FROM users WHERE email = ?').get(usertoken.email)

        if(user !== undefined && user.password === usertoken.password) {
            const password = await hash(req.body.password)
            randomDatabase.prepare('UPDATE users SET password = ? WHERE email = ?')
                .run(
                    password,
                    user.email
                )
            return reply.redirect('/log_in/302')
        }

        throw new unknownUser("User does not exist.")
    }

    throw new Error('404')
}