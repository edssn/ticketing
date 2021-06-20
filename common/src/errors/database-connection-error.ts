import { CustomError } from './custom-error';

export class DatabaseConectionError extends CustomError {

    statusCode = 500;
    reason = 'Error conection database';

    constructor () {
        super('Error connecting to db');
        Object.setPrototypeOf(this, DatabaseConectionError.prototype);
    }

    serializeErrors () {
        return [{ message: this.reason }];
    }
}