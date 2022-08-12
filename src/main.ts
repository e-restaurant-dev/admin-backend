import express from 'express'
import cookieParser from 'cookie-parser'
import { session } from './middleware/Session.Middleware.js'
import { route as AuthRouter } from './components/auth/Auth.Controller.js'

import * as DB from './data/database.js'
import * as Cache from './data/cache.js'

import { State } from './utils/state.js'
import { errorHandler } from './middleware/ErrorHandler.Middleware.js'
import bodyParser from 'body-parser'

export const app = express()

app.use(cookieParser())
app.use(session)
app.use(bodyParser.json())

app.use('/auth', AuthRouter)
app.use(errorHandler)

export async function configureState() {
    const databaseClient = await DB.connect(DB.instance())
    State.set('database', databaseClient)

    const cacheClient = await Cache.connect(Cache.instance())
    State.set('cache', cacheClient)

    State.set(
        'salt',
        Buffer.from(process.env.PASSWORD_HASH_SALT!.split(',').map(x => parseInt(x, 16))),
    )

    State.set('app', app)
}
