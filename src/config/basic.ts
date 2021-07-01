export const NODE_ENV = process.env.NODE_ENV || 'local';
export const IS_LOCAL = NODE_ENV === 'local';
export const IS_DEV = NODE_ENV === 'dev';
export const IS_TEST = NODE_ENV === 'test';
export const IS_PROD = NODE_ENV === 'prod';
export const PORT = process.env.PORT
    ? Number.parseInt(process.env.PORT, 10)
    : 5000;
export const TIMEZONE = process.env.TIMEZONE || 'UTC';
export const EXPOSE_SERVER_ERRORS = process.env.EXPOSE_SERVER_ERRORS === 'true';
