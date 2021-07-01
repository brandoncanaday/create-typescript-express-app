import Debug from 'debug';

export function Logger(
    projectName: string,
    namespace: string
): {
    info: Debug.Debugger;
    error: Debug.Debugger;
} {
    const info = Debug(`${projectName}:${namespace}`);
    const error = Debug(`${projectName}:${namespace}:error`);

    // set output stream for log.info() to be stdout (default is stderr)
    // eslint-disable-next-line no-console
    info.log = console.log.bind(console);

    return {
        info,
        error,
    };
}
