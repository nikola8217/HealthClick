import { CustomError } from "./custom-error";
export declare class ServerError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
