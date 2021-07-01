import { Request, RequestHandler } from 'express';
import morgan from 'morgan';

morgan.token('id', (req: Request) => req.id);

export class MorganRequestLogger {
    public static create(level: string): RequestHandler[] {
        return [
            morgan(level, {
                skip: (_, res) => res.statusCode < 400,
                stream: process.stderr,
            }),
            morgan(level, {
                skip: (_, res) => res.statusCode >= 400,
                stream: process.stdout,
            }),
        ];
    }
}
