import { randomDatabase } from "../database.js";
import { verify } from "phc-argon2";
import {notVerifiedError} from "../../errors/notVerifiedError.js";
import {unknownUser} from "../../errors/unknownUser.js";
import {generateToken} from "../../utils/tokenHandler.js";
import {mailVerifyHandle} from "../../utils/mailHandler.js";


export const setUser = async (req, reply) => {
    if(req.session.get('user') === undefined) {

        if (req.params.id === 200) {

            return reply.view('./templates/auth/loginform.ejs', {
                note: "The account was successfully created. a verification email was sent to you.",
                status: 'is-success'
            })
        }
        else if (req.params.id === 202) {
            return reply.view('./templates/auth/loginform.ejs', {
                note: "verified !  you can log in to your account",
                status: 'is-success'
            })
        }
        else if (req.params.id === 404) {
            return reply.view('./templates/auth/loginform.ejs', {
                note: "Incorrect email or password",
                status: 'is-danger'
            })
        }
        else if (req.params.id === 302) {
            return reply.view('./templates/auth/loginform.ejs', {
                note: "your password has been successfully reinitialised.",
                status: 'is-success'
            })
        }
        else {
            return reply.view('./templates/auth/loginform.ejs')
        }
    }
    else {
        return reply.redirect('/')
    }
}

export const loginUser = async (req, reply) => {
    if(req.session.user === undefined) {
        const form =  req.body
        const user =  randomDatabase.prepare('SELECT * FROM users WHERE email = ?').get(form.email)
        if(user !== undefined && (await verify(user.password, form.password)) && user.verification === 1) {
            req.session.set('user', {
                id: user.id,
                email: user.email,
                name: (user.first_name + ' ' + user.last_name),
            })
            req.session.options({
                expires: new Date(Date.now() + (1000 * 60 * 10))  // session is valid for 10 minutes
            })

            return reply.redirect('/')
        }
        else if(user !== undefined && user.verification === false) {
            const token =  await generateToken(user,'verify', reply)
            await mailVerifyHandle(user, token)
            throw new notVerifiedError ('You must validate you account, check you email.')
        }
        else {
            throw new unknownUser(' Incorrect email or password.')
        }

    }
    reply.redirect('/')
}

export const logoutUser = async (req, reply) => {
    if (req.session.user !== undefined) {
        req.session.delete()
        return reply.redirect('/')
    }
    reply.redirect('/')
}