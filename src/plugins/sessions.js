import fastifySecureSession  from "@fastify/secure-session";
import fp from "fastify-plugin";
import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";


export default fp(async function sessions(app, options) {
    const rootDir = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
    app.register (fastifySecureSession, {
        cookieName: 'session-cookie',
        key: readFileSync(join(rootDir, 'private/secret-key')),
        cookie: {
            path: '/'
        }
    })
})