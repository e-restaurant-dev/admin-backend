export enum ResponseType {
    failed = 'failed',
    success = 'success',
}

export interface ResponseBody<T> {
    type: ResponseType;
    data: T;
}
