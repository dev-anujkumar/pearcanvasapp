import { stub } from 'sinon';

describe('Testing config----->', () => {
    process.env = {
        NODE_ENV: "development"
    }
    stub(process.env, 'NODE_ENV').value(process.env.NODE_ENV);

    describe('environmental variables', () => {
        const OLD_ENV = process.env;

        beforeEach(() => {
            jest.resetModules()
            process.env = { ...OLD_ENV };
            delete process.env.NODE_ENV;
        });

        afterEach(() => {
            process.env = OLD_ENV;
        });
        test('will receive process.env variables', () => {
            process.env.NODE_ENV = 'development';
            const testedModule = require('../../src/config/cypressConfig').default
          
        });
    });
});