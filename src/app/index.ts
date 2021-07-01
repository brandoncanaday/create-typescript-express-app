import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { MorganRequestLogger } from '../lib';
import { MORGAN_LOG_LEVEL, PAGINATION_MAX_LIMIT } from '../config';
import { routes as apiRoutes } from './routes';
import * as customMiddleware from './middleware';
import { AppController } from './controllers';

const App = express();

// custom middleware
App.use(customMiddleware.assignRequestId());
App.use(MorganRequestLogger.create(MORGAN_LOG_LEVEL));

// express middleware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(cors());
App.use(helmet());

// other custom middleware
App.use(customMiddleware.pagination(PAGINATION_MAX_LIMIT));

// api routes
App.use('/api', apiRoutes);

// redirect root route to api docs
App.get('/', (_, res) => res.redirect('/api/docs'));

// 404 and 5xx handlers
App.use(AppController.handle404());
App.use(AppController.handleError());

export { App };
