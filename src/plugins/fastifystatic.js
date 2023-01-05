import fp from "fastify-plugin"
import { fastifyStatic }    from "@fastify/static";
import { dirname, join } from "node:path"
import {fileURLToPath} from "node:url";

/**
 * @param {FastifyInstance} pf
 * @param {Object} options
 */

export default fp(async function statics (app, options) {
    const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
    app.register (fastifyStatic, {
        root: join(rootDir, 'public')
    })
})



