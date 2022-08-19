
import { RequestSession } from './utils/sessions.js'

declare global {
    namespace Express {
        export interface Request {
            session: RequestSession;
        }
    }
}
