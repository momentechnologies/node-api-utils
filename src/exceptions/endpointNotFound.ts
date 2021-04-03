import ApiError, { errorResponse } from './api';

export default class EndpointNotFound extends ApiError {
    path;
    method;

    constructor(path: string, method: string) {
        super('Endpoint was not found');
        this.path = path;
        this.method = method;
        this.canBeReported = false;
    }

    getStatus() {
        return 404;
    }

    getBody() {
        return errorResponse(this.message, 'endpoint_not_found', {
            path: this.path,
            method: this.method,
        });
    }
}
