import fp from "fastify-plugin"
import fastifyView  from "@fastify/view";
import ejs  from "ejs";


/**
 * @param {FastifyInstance} pf
 * @param {Object} options
 */

export default fp (async function views (app,options) {
    app.register(fastifyView, {
        engine: {
            ejs
        }
    })
})



