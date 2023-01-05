import {notLogged} from "../../errors/notLogged.js";
import {randomDatabase} from "../database.js";
import {fileTypeError} from "../../errors/fileTypeError.js";


export async function newPost (req, reply) {

    if(req.session.user !== undefined) {

        return reply.view('./templates/auth/newpost.ejs', {
            user: req.session.user
        })
    }

    throw new notLogged('You need to login to create a new post.')
}

export async function createPost (req, reply) {

    if(req.session.user !== undefined) {
        if(req.file === undefined) {
            throw new fileTypeError('Only png and jpg files are allowed')
        }
        else {
            const post = await req.body
            randomDatabase.prepare('INSERT INTO posts (title, content, user_name, user_id, file_name) VALUES (?, ?, ?, ?, ?)')
                .run(
                    post.title,
                    post.content,
                    req.session.user.name,
                    req.session.user.id,
                    req.file.filename
                )


            return reply.redirect('/library')
        }
    }
    throw new notLogged('You need to login to create a new post.')
}