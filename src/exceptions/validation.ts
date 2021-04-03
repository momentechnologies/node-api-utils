import ApiError, { errorResponse } from './api';

type validationError = {
    key: string;
    message: string;
    uid: number;
};

export default class Validation extends ApiError {
    static validationTypes = {
        INVALID_PARAMETER: 1,
        ALREADY_EXISTS: 2,
        NOT_FOUND: 3,
    };
    errors: validationError[];

    constructor(errors: validationError[] | validationError = []) {
        super('The request is not valid');
        this.reportToSentry = false;

        if (Array.isArray(errors)) {
            this.errors = errors;
        } else {
            this.errors = [errors];
        }
    }

    getStatus() {
        return 422;
    }

    getBody() {
        return errorResponse(this.message, 'validation', {
            messages: this.errors,
        });
    }

    static validationError = (
        key: string,
        message: string,
        uid = Validation.validationTypes.INVALID_PARAMETER
    ): validationError => ({
        key,
        message,
        uid,
    });
}
