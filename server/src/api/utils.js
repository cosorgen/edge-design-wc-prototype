export class ServerError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code;
    }
}
export default function throwServerError(message, code) {
    const err = new ServerError(message, code);
    throw err;
}
