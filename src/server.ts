import { app } from './main.js'
import { config as getEnvFromFile } from 'dotenv'
import { logger } from './logger/log.js'

if (process.env.NODE_ENV === undefined) {
    logger.warn('NODE_ENV is not specified!')
    process.env.NODE_ENV = 'development'
}

if (process.env.NODE_ENV === 'development') {
    getEnvFromFile()
}

const requiredEnvProperties = [
    'ROOT_DOMAIN',
    'ADMIN_CLIENT_URL',
    'PGDATABASE',
    'PGUSER',
    'PGPASSWORD',
    'REDIS_PASSWORD',
]

for (const property of requiredEnvProperties) {
    if (!Object.prototype.hasOwnProperty.call(process.env, property)) {
        logger.error(`Required property ${property} not found in process.env!`)
        process.exit()
    }
}

app.listen(3001, () => {
    logger.info('Server is started at the port 3001')
})
