import { Client, ClientConfig } from 'pg'
import { logger } from '@root/logger/log.js'

export const instance = async (options?: ClientConfig): Promise<Client> => {
    const client = new Client(options)
    try {
        await client.connect()
    } catch (err) {
        // eslint-disable-next-line no-console
        logger.error('Cannot connect to database!')
        process.exit()
    }
    return client
}


