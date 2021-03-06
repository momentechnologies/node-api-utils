import ApiError, { errorResponse } from './api';

export const unauthorizedTypes = {
    NO_ACCESS: 1,
    NOT_LOGGED_IN: 2,
};

const uidMessages = {
    [unauthorizedTypes.NO_ACCESS]: 'You do not have access to this resource',
    [unauthorizedTypes.NOT_LOGGED_IN]: 'You are not logged in',
};

export default class Unauthorized extends ApiError {
    uid;

    constructor(message: string, uid = unauthorizedTypes.NO_ACCESS) {
        super(message);
        this.uid = uid;
        this.canBeReported = false;
    }

    getStatus() {
        return 401;
    }

    getBody() {
        return errorResponse(this.message, 'unauthorized', {
            uid: this.uid,
            uidMessage: uidMessages[this.uid],
        });
    }
}
