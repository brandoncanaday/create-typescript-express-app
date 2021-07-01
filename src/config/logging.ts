import { IS_LOCAL } from './basic';

export const MORGAN_LOG_LEVEL = IS_LOCAL
    ? 'dev'
    : ':id - :remote-addr - :method :url :status :response-time ms - :res[content-length] bytes - ":referrer" ":user-agent"';
