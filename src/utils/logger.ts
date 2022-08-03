import { default as pino, Logger } from 'pino'
import pretty from 'pino-pretty'

export let logger: Logger

if (process.env.NODE_ENV === 'production') {
    logger = pino()
} else {
    const stream = pretty({
        colorize: true,
    })
    logger = pino(stream)
}
