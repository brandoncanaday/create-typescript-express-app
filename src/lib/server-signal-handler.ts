import { Server } from 'http';
import { createHttpTerminator } from 'http-terminator';
import { NPM_PACKAGE_NAME } from '../config';
import { Logger } from './logger';
import { Utils } from './utils';

const log = Logger(NPM_PACKAGE_NAME, Utils.getCurrentFileName(__filename));

export class ServerSignalHandler {
    public static handleGracefulShutdown(
        signal: NodeJS.Signals,
        server: Server
    ): NodeJS.Process {
        return process.on(signal, () => {
            log.info('process %o received %o signal', process.pid, signal);
            log.info('closing http server');
            createHttpTerminator({
                server,
            })
                .terminate()
                .then(() =>
                    log.info('process %o exited gracefully', process.pid)
                )
                .catch((error) => {
                    log.error('process %o exited with error', process.pid);
                    throw error;
                });
        });
    }
}
