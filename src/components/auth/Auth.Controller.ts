import { AuthErrorCode } from '#app/constants/errors.js'
import { asyncHandler, failedBody, successBody } from '#app/utils/apiHandler.js'
import { AuthError, ErrorRegistry } from '#app/utils/errors.js'
import { Router, RequestHandler } from 'express'
import {
    UserDatabaseTables,
    findUser,
    addUser,
} from './Auth.Model.js'

export const route = Router()

interface LoginBody {
    email: string;
    password: string;
}
const loginFor = (table: UserDatabaseTables): RequestHandler<any, any, LoginBody> => asyncHandler(
    async (req, res) => {
        const user = await findUser(req.body, table, ['password'], 'exclude')
        if (user) {
            res.send(successBody(user))
        } else {
            throw new AuthError({ message: 'Failed to login, cannot find such email/password pair', code: AuthErrorCode.FAILED_TO_LOGIN })
        }
    },
)
ErrorRegistry.registerError(AuthErrorCode.FAILED_TO_LOGIN, (err, req, res) => {
    res?.status(403).send(failedBody(err.message))
})

route.post('/admin/login', loginFor(UserDatabaseTables.AdminUser))
route.post('/worker/login', loginFor(UserDatabaseTables.WorkerUser))

interface RegistrationAdminBody {
    email: string;
    password: string;
}
route.post('/admin/registration', asyncHandler<void, RegistrationAdminBody, null>(async (req, res) => {
    await addUser(req.body, UserDatabaseTables.AdminUser)
    res.send(successBody(null))
}))

route.get('/user')

