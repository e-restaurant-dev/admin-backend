import { app } from './main.js'
import { config as getEnvFromFile } from 'dotenv'

if (process.env.NODE_ENV === undefined) {
    console.warn('NODE_ENV is not specified!')
    process.env.NODE_ENV = 'development'
}

if (process.env.NODE_ENV === 'development') {
    getEnvFromFile()
}

const requiredEnvProperties = [
    'ROOT_DOMAIN',
]

for (const property of requiredEnvProperties) {
    if (!Object.prototype.hasOwnProperty.call(process.env, property)) {
        // eslint-disable-next-line no-console
        console.error(`Required property ${property} not found in process.env!`)
        process.exit()
    }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server is started at the port ' + PORT)
})
