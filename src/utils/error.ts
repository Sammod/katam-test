/**
 * DomainError
 *
 * Custom error class to extend with specific codes and messages
 *
 * Shamelessly stolen from https://rclayton.silvrback.com/custom-errors-in-node-js
 * All kudos to the author: Richard Clayton
 */
export class DomainError extends Error {
  status: any;
  constructor(msg: string | undefined, status: any) {
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

export class InternalServerError extends DomainError {
  constructor(msg: string) {
    super(msg, 500);
  }
}

export class ValidationError extends DomainError {
  data: {
    // eslint-disable-next-line no-underscore-dangle
    object: any;
    // fetch only message and type from each error
    details: { message: any; type: any }[];
  };
  constructor(msg: string, original?: any) {
    super(msg, 422);
    this.data = {
      // eslint-disable-next-line no-underscore-dangle
      object: original._object,

      // fetch only message and type from each error
      details: original.details.map((message: string, type: any) => ({
        message: message.replace(/['"]/g, ''),
        type,
      })),
    };
  }
}

export class ResourceNotFoundError extends DomainError {
  constructor(msg: string) {
    super(msg, 404);
  }
}

export class BadRequestError extends DomainError {
  constructor(msg: string) {
    super(msg, 400);
  }
}

export class WeakValidationError extends DomainError {
  constructor(msg: any) {
    super(msg, 422);
  }
}

export const throwCustomDomainError = (statusCode: any) => {
  switch (statusCode) {
    case 400:
      throw new BadRequestError(
        'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
      );

    case 404:
      throw new ResourceNotFoundError(
        'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
      );

    case 422:
      throw new ValidationError(
        'The server understands the content type of the request entity, and the syntax of the request entity is correct but was unable to process the contained instructions.',
      );

    default:
      throw new InternalServerError(
        'The server encountered an unexpected condition that prevented it from fulfilling the request.',
      );
  }
};
