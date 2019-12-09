import { stub } from 'sinon';

describe('Testing prod env file----->', () => {
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
            process.env.NODE_ENV = 'production';
            
            const testedModule = require('../../src/env/perf').default
          expect(testedModule.WRAPPER_URL).toBe("https://localhost:/toc-wrapper/index.html")
          expect(testedModule.TCM_DASHBOARD_UI_URL).toBe("https://localhost:/cypress/trackchanges/index.html")
          expect(testedModule.LOCK_API_BASE_URL).toBe("https://localhost:/cypress/dashboard-srvr")
        });
    });
});