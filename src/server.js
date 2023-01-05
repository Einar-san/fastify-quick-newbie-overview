//-------------IMPORT
import fastify           from "fastify";
import fastifyFormbody   from "@fastify/formbody";
import dotenv            from "dotenv";
import jsonwt            from "./plugins/jsonwt.js";
import sessions          from "./plugins/sessions.js";
import views             from "./plugins/fastifyView.js";
import statics           from "./plugins/fastifystatic.js";


//-------------PERSONAL IMPORT

import { pfRoots }      from "./rootes.js";
import setErrorHandler  from "./plugins/setErrorHandler.js";






//-------------INITIALIZATION
const app = fastify({
    maxParamLength: 5000,
})
dotenv.config()

//--------------MODULES REGISTRATION

app.register(jsonwt)
app.register(sessions)
app.register(fastifyFormbody)
app.register(statics)
app.register(views)
app.register(setErrorHandler)


//---------------ROOTS REGISTRATION

app.register(pfRoots)


//----------------STARTING SERVER
const startServer =  async () => {
    try {
        await app.listen({port: 3000})
    }catch(err) {
        console.log(err)
        process.exit(1)
    }
}

startServer()