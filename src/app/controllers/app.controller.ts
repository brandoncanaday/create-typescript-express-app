import {
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
    RequestHandler,
} from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { serializeError } from 'serialize-error';
import { EXPOSE_SERVER_ERRORS, NPM_PACKAGE_NAME } from '../../config';
import { Utils, Logger } from '../../lib';

const log = Logger(NPM_PACKAGE_NAME, Utils.getCurrentFileName(__filename));

export class AppController {
    public static handle404(): RequestHandler {
        return (req: Request, _: Response, next: NextFunction) => {
            const status = 404;
            const message = `The route ${req.path} does not exist!`;

            next(createHttpError(status, message));
        };
    }

    public static handleError(): ErrorRequestHandler {
        return (
            err: HttpError,
            _: Request,
            res: Response,
            __: NextFunction
        ) => {
            const name = err.name || 'Error';
            const status = err.status || err.statusCode || 500;
            const message =
                err.message ||
                `It's not you, it's us. Please try again in a little bit.`;

            if (status !== 404) {
                log.error('http error %o', {
                    name,
                    status,
                    message,
                    error: serializeError(err),
                });
            }

            res.status(status).json({
                success: false,
                ...((err.expose || EXPOSE_SERVER_ERRORS) && {
                    error: { name, status, message },
                }),
            });
        };
    }
}
