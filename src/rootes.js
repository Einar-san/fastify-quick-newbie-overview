import {newAccount, verifyAccount} from "./actions/auth/signup.js"
import {loginUser, logoutUser, setUser} from "./actions/auth/login.js"
import {viewError} from "./utils/viewError.js";
import {showlib} from "./actions/library.js";
import {createPost, newPost} from "./actions/auth/Posts.js";
import {extname} from "node:path";
import {fileTypeError} from "./errors/fileTypeError.js";
import multer from "fastify-multer";
import {forgotPassword, resetPassword} from "./actions/auth/reset.js";




export async function pfRoots (app, opts) {

    // MULTER : used for handling upload

    app.register(multer.contentParser)
    const filter = function (req, file, cb) {        // this will allow only png and jpg files to be uploaded

        const fileExtension = extname(file.originalname)
        if(fileExtension === '.jpg' || fileExtension === '.png') {
            cb(null, true)

        }
        else {
            cb(null, false)
        }
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {    // this is the location of the uploaded files
            cb(null, './public/arts')
        },
        filename: (req, file, cb) => {      // file name in the directory public/arts/
            cb(null, 'art-'+ Date.now()+'.jpg')
        }
    })

    const upload = multer({
        storage: storage,
        fileFilter: filter
    })

    //*********** ALL ROOTS

    app.get('/', (req, reply) => {

        return reply.view('./templates/index.ejs', {
            user: req.session.user
        })
    })


    app.get('/library', showlib)
    app.get('/newPost', newPost)
    app.post('/newPost',{ preHandler: upload.single('art')}, createPost) // preHandler for file upload


    //******** SIGNUP/ VERIFICATION
    app.get('/sign_up', newAccount)
    app.post('/sign_up', newAccount)
    app.get('/log_in/:id',{
        schema: {
            params: {
                id: {
                    type: 'integer'
                }
            }
        }
    }, setUser)

    app.get('/verify/:id/:token', {
        schema: {
            params: {
                id: {
                    type: 'integer'
                },
                token: {
                    type: 'string'
                }
            }
        }
    }, verifyAccount)

    //******** LOGIN/LOGOUT/ RESET PASSWORD

    app.post('/log_in', loginUser)
    app.get('/log_out', logoutUser)
    app.get('/forgotpassword', forgotPassword)
    app.post('/forgotpassword', forgotPassword)
    app.get('/reset/:id/:token',{
        schema: {
            params: {
                id: {
                    type: 'integer'
                },
                token: {
                    type: 'string'
                }
            }
        }
    } , resetPassword)
    app.post('/reset/:token',{
        schema: {
            params: {
                token: {
                    type: 'string'
                }
            }
        }
    } , resetPassword)

    //--------RENDERING ERRORS
    app.get('/error/:errorMsg', {
        schema: {
            params: {
                errorMsg: {
                    type: 'string'
                }
            }
        }
    },viewError)

}
