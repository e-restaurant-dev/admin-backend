import { serialize as serializeCookie } from 'cookie'
import { NextFunction, Request, Response } from 'express'
import { randomUUID as generateSID } from 'node:crypto'

type Session<T = Record<string, any>> = {
    id: string;
} & T

interface Database {
    sessions: Record<string, Session<any>>;
}
const db = {
    sessions: {},
}

const getSession = async <T = any>(
    db: Database,
    sessionId: string,
): Promise<Session<T>> => db.sessions[sessionId]
const addSession = async <T = any>(
    db: Database,
    session: Session<T>,
): Promise<Session<T>> => (db.sessions[session.id] = session)

const SID_COOKIE_NAME = 'SID'

function createSession(): Session {
    return { id: generateSID() }
}

export type SessionPayload<T = any> = {
    session?: Session<T>;
}

export async function sessionMiddleware(
    req: Request & SessionPayload,
    res: Response,
    next: NextFunction,
) {
    if (req.session != null) {
        next()
        return
    }

    const sessionId: string | undefined = req.cookies[SID_COOKIE_NAME]
    const session: Session | null = sessionId ? await getSession(db, sessionId) : null
    if (session === null) {
        const newSession = createSession()
        await addSession(db, newSession)
        req.session = newSession

        const cookieAge = new Date()
        cookieAge.setFullYear(cookieAge.getFullYear() + 1)

        res.setHeader(
            'Set-Cookie',
            serializeCookie(SID_COOKIE_NAME, newSession.id, {
                domain: process.env.DOMAIN,
                httpOnly: true,
                expires: cookieAge,
                path: '/',
            }),
        )
    }

    next()
}
