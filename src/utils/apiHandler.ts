import { NextFunction, RequestHandler, Response, Request } from 'express'
import { ResponseBody, ResponseType } from './apiTypes.js'

export const asyncHandler = <P, ReqBody, ResBody>(
    handler: (
        req: Request<P, ResponseBody<ResBody>, ReqBody>,
        res: Response<ResponseBody<ResBody>>,
        next: NextFunction
    ) => Promise<any>,
): RequestHandler<P, ResponseBody<ResBody>, ReqBody> => (
        (req, res, next) => {
            handler(req, res, next)
                .then(next)
                .catch(next)
        }
    )

export const successBody = <T>(data: T): ResponseBody<T> => ({
    type: ResponseType.success,
    data,
})

export const failedBody = <T>(data: T): ResponseBody<T> => ({
    type: ResponseType.failed,
    data,
})
