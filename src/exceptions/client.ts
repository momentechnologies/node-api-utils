import ApiError, { errorResponse } from './api';

export default class Client extends ApiError {
    error;
    key;

    constructor(message: string, key: string, error: any = {}) {
        super(message);
        this.key = key;
        this.error = error;
        this.canBeReported = false;
    }

    getStatus() {
        return 400;
    }

    getBody() {
        return errorResponse(this.message, this.key, this.error);
    }
}
