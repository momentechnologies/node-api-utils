export default class ApiError extends Error {
    reportToSentry: boolean = true;
    status: number = 500;

    constructor(message: string, reportToSentry: boolean = true) {
        super(message);
        this.reportToSentry = reportToSentry;
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
