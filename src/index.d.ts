
import { Send } from 'express'
import { UserSession } from './utils/sessions.js'

declare global {
    namespace Express {
        export interface Request {
            session: UserSession | null;
        }

        export interface Response<ResBody extends { _type: 'error' | 'success'; }> {
            send: Send<{ _type: 'error' | 'success'; }, this>;
        }
    }
}
