import Debug from 'debug';
import { Logger } from './logger';

const projectName = 'myproject';
const namespace = 'test';

test('Logger should be created', () => {
    const log = Logger(projectName, namespace);

    expect(log).toBeDefined();
});

test('Logger should be implemented with debug module', () => {
    const log = Logger(projectName, namespace);

    expect(log.info.name).toBe(Debug(namespace).name);
    expect(log.error.name).toBe(Debug(namespace).name);
});

test(`Logger.info() should use namespace '${projectName}:${namespace}'`, () => {
    const log = Logger(projectName, namespace);
    const expectedNamespace = `${projectName}:${namespace}`;

    expect(log.info.namespace).toBe(expectedNamespace);
});

test(`Logger.error() should use namespace '${projectName}:${namespace}:error'`, () => {
    const log = Logger(projectName, namespace);
    const expectedNamespace = `${projectName}:${namespace}:error`;

    expect(log.error.namespace).toBe(expectedNamespace);
});
