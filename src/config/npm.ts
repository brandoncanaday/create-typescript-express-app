// expose package.json vars as config
export const NPM_PACKAGE_VERSION = `${process.env.npm_package_version || ''}`;
export const NPM_PACKAGE_NAME = `${process.env.npm_package_name || ''}`;
