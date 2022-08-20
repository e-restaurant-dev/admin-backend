import { State } from './state.js'

export interface UserSessionData {
    userID: number;
}

export interface RequestSession {
    id: string;
    data: UserSessionData | null;
}

const SESSION_CACHE_PREFIX = 'session:'

export const get = async (id: string): Promise<UserSessionData | null> => {
    const client = State.getOrThrow('cache')

    const session = await client.hGetAll(SESSION_CACHE_PREFIX + id) as unknown as UserSessionData | null

    return session
}

export const set = async (id: string, session: UserSessionData): Promise<void> => {
    const client = State.getOrThrow('cache')

    await client.sendCommand(['HMSET', SESSION_CACHE_PREFIX + id, 'userID', session.userID.toString()])
}
