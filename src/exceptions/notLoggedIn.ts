import ApiError, { errorResponse } from './api';

export default class NotLoggedIn extends ApiError {
    constructor() {
        super('You are not logged in');
        this.canBeReported = false;
    }

    getStatus() {
        return 401;
    }

    getBody() {
        return errorResponse(this.message, 'not_logged_in');
    }
}
