import express from 'express'
import cookieParser from 'cookie-parser'
import { sessionMiddleware } from './middleware/Session.Middleware.js'

export const app = express()

app.use(cookieParser())
app.use(sessionMiddleware)

app.get('/', (req, res) => {
    res.send(req.cookies)
})
