import {randomDatabase} from "./database.js";


export async function showlib (req, reply) {

    const posts = randomDatabase.prepare('SELECT * FROM posts').all()

    return reply.view('./templates/library.ejs', {
        posts: posts,
        user: req.session.user
    })

}