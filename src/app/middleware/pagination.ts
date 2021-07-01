import { Request, Response, RequestHandler, NextFunction } from 'express';
import { Pagination } from '../../lib/pagination';

export function pagination(maxLimit: number): RequestHandler {
    return (req: Request, _: Response, next: NextFunction) => {
        const { limit, page } = Pagination.parsePaginationParams(
            req.query.page as string,
            req.query.limit as string,
            maxLimit
        );

        req.pagination = { limit, page };

        next();
    };
}
