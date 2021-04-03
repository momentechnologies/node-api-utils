export default class ApiError extends Error {
    canBeReported: boolean = true;
    status: number = 500;

    constructor(message: string, canBeReported: boolean = true) {
        super(message);
        this.canBeReported = canBeReported;
    }

    getStatus(): number {
        return this.status;
    }

    getBody(): any {
        return {
            message: this.message,
        };
    }
}

export const errorResponse = (
    message: string,
    type: string,
    error: any = null
) => ({
    type,
    message,
    error,
});
