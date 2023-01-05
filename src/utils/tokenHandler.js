import {createDecoder} from "fast-jwt"


export const generateToken = async (user, type, reply) => {
    const usertoken = await reply.jwtSign(user, {expiresIn: 1000*60*10})
    return `http://localhost:3000/${type}/${user.id}/${usertoken}`
}

export const decodeToken = async (token) => {
    const decoder = createDecoder()
    return decoder(token)
}