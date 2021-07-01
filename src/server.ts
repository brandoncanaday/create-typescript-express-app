import moment from 'moment-timezone';
import { NPM_PACKAGE_NAME, PORT, TIMEZONE } from './config';
import { App } from './app';
import { Logger, Utils, ServerSignalHandler } from './lib';

moment.tz.setDefault(TIMEZONE);

const log = Logger(NPM_PACKAGE_NAME, Utils.getCurrentFileName(__filename));

(function start() {
    try {
        const server = App.listen(PORT, () =>
            log.info(`server listening on port %o`, PORT)
        );

        ServerSignalHandler.handleGracefulShutdown('SIGINT', server);
        ServerSignalHandler.handleGracefulShutdown('SIGTERM', server);
    } catch (error) {
        log.error('server startup error %o', error);
        throw error;
    }
})();
