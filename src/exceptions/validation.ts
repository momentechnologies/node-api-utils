import ApiException, { errorResponse } from './apiException.js';

type validationError = {
    key: string;
    message: string;
    uid: number;
};

export const validationTypes = {
    INVALID_PARAMETER: 1,
    ALREADY_EXISTS: 2,
    NOT_FOUND: 3,
};

export default class Validation extends ApiException {
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
}

export const validationError = (
    key: string,
    message: string,
    uid = validationTypes.INVALID_PARAMETER
): validationError => ({
    key,
    message,
    uid,
});
