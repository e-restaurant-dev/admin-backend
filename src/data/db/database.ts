import { Client, ClientConfig } from 'pg'
import { exit } from '#app/utils/exit.js'

export const instance = async (options?: ClientConfig): Promise<Client> => {
    const client = new Client(options)
    try {
        await client.connect()
    } catch (err) {
        exit('Cannot connect to database!')
    }
    return client
}


