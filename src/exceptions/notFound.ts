import ApiError, { errorResponse } from './api';

export default class NotFound extends ApiError {
    parameter;

    constructor(parameter: string) {
        super(`${parameter} was not found`);
        this.parameter = parameter;
        this.canBeReported = false;
    }

    getStatus() {
        return 404;
    }

    getBody() {
        return errorResponse(this.message, 'not_found', {
            parameter: this.parameter,
        });
    }
}
