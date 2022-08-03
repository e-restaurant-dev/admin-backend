import { logger } from './logger.js'

export const exit = (message: string, log = logger.error) => {
    log(message)
    process.exitCode = 1
}
