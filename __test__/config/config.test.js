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
            const testedModule = require('../../src/config/config').default
            expect(testedModule.userName).toBe('c5test01')
            expect(testedModule.userId).toBe('c5test01')
            expect(testedModule.userEmail).toBe('c5test01@mctest.local')
            expect(testedModule.assignee).toBe('c5test01')
        });
    });
});