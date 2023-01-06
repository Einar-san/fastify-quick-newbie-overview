import fp from "fastify-plugin";
import {notVerifiedError} from "../errors/notVerifiedError.js";
import {refreshVerificationError} from "../errors/refreshVerificationError.js";
import {retryError} from "../errors/retryError.js";
import {unknownUser} from "../errors/unknownUser.js";
import {notLogged} from "../errors/notLogged.js";
import {fileTypeError} from "../errors/fileTypeError.js";
import {userExist} from "../errors/userExist.js";


export default fp(async function errorHandler(app, options) {
    app.setErrorHandler((error, req, reply) => {
        if(error instanceof retryError) {
            return reply.redirect(`/error/${error.message}`)
        }
        else if (error instanceof refreshVerificationError) {
            return reply.redirect(`/error/${error.message}`)
        }
        else if (error instanceof notVerifiedError) {
            return reply.redirect(`/error/${error.message}`)
        }
        else if (error instanceof unknownUser) {
            return reply.redirect('/log_in/404')
        }
        else if (error instanceof notLogged) {
            return reply.redirect(`/error/${error.message}`)
        }
        else if (error instanceof fileTypeError) {
            return reply.redirect(`/error/${error.message}`)
        }
        else if (error instanceof userExist) {
            return reply.redirect(`/error/${error.message}`)
        }
        else {
            return reply.redirect('/error/404 :(')
        }
    })
})