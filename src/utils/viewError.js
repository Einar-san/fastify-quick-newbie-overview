

export async function viewError (req, reply){
    return reply.view('./templates/error.ejs', {
        message: req.params.errorMsg
    })
}