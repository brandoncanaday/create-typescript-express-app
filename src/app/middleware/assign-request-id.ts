import { NextFunction, Request, RequestHandler } from 'express';
import { v1 as uuidv1 } from 'uuid';

export function assignRequestId(): RequestHandler {
    return (req: Request, _, next: NextFunction) => {
        req.id = uuidv1();
        next();
    };
}
