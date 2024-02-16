import { CUSTOM_ERROR_NAME } from "../constantes/errorNames";

export class CustomError extends Error {
    errorcode: number;

    constructor(message: string, errorCode: number) {
        super(message);
        this.name = CUSTOM_ERROR_NAME;
        this.errorcode = errorCode;
    }
}