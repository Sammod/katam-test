"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwCustomDomainError = exports.WeakValidationError = exports.BadRequestError = exports.ResourceNotFoundError = exports.ValidationError = exports.InternalServerError = exports.DomainError = void 0;
/**
 * DomainError
 *
 * Custom error class to extend with specific codes and messages
 *
 * Shamelessly stolen from https://rclayton.silvrback.com/custom-errors-in-node-js
 * All kudos to the author: Richard Clayton
 */
class DomainError extends Error {
    constructor(msg, status) {
        super(msg);
        // Ensure the name of this error is the same as the export class name
        this.name = this.constructor.name;
        this.status = status;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        // Ssee Node.js reference.
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.DomainError = DomainError;
class InternalServerError extends DomainError {
    constructor(msg) {
        super(msg, 500);
    }
}
exports.InternalServerError = InternalServerError;
class ValidationError extends DomainError {
    constructor(msg, original) {
        super(msg, 422);
        this.data = {
            // eslint-disable-next-line no-underscore-dangle
            object: original._object,
            // fetch only message and type from each error
            details: original.details.map((message, type) => ({
                message: message.replace(/['"]/g, ''),
                type,
            })),
        };
    }
}
exports.ValidationError = ValidationError;
class ResourceNotFoundError extends DomainError {
    constructor(msg) {
        super(msg, 404);
    }
}
exports.ResourceNotFoundError = ResourceNotFoundError;
class BadRequestError extends DomainError {
    constructor(msg) {
        super(msg, 400);
    }
}
exports.BadRequestError = BadRequestError;
class WeakValidationError extends DomainError {
    constructor(msg) {
        super(msg, 422);
    }
}
exports.WeakValidationError = WeakValidationError;
const throwCustomDomainError = (statusCode) => {
    switch (statusCode) {
        case 400:
            throw new BadRequestError('The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).');
        case 404:
            throw new ResourceNotFoundError('The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.');
        case 422:
            throw new ValidationError('The server understands the content type of the request entity, and the syntax of the request entity is correct but was unable to process the contained instructions.');
        default:
            throw new InternalServerError('The server encountered an unexpected condition that prevented it from fulfilling the request.');
    }
};
exports.throwCustomDomainError = throwCustomDomainError;
