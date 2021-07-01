export {};

declare global {
    namespace Express {
        interface Request {
            id: string;
            pagination: { limit: number; page: number };
        }
    }
}
