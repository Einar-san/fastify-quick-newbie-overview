import fp from "fastify-plugin";
import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import fastifyJwt from "@fastify/jwt";

export default fp (async function jsonwt (app, options) {
    const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
    app.register(fastifyJwt, {
        secret: {
            private:  readFileSync(join(rootDir, 'private/private.key')  , 'utf8'),
            public :  readFileSync(join(rootDir, 'private/public.key' )  , 'utf8')
        },
        sign: {
            algorithm: 'RS256'
        }
    })
})