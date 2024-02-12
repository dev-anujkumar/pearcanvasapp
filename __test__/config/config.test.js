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
        it('will receive  process.env.NODE_ENV = development variables', () => {
            process.env.NODE_ENV = 'development';
            const testedModule = require('../../src/config/config').default
            expect(testedModule.userId).toBe('c5test01')
            expect(testedModule.WRAPPER_URL).toBe("https://local-dev.pearson.com:4000")
            expect(testedModule.TCM_DASHBOARD_UI_URL).toBe("https://test-structuredauthoring.pearson.com/cypress/trackchanges/index.html")
            // expect(testedModule.LOCK_API_BASE_URL).toBe("https://dev-structuredauthoring.pearson.com/cypress/dashboard-srvr")
        });
        it('will receive process.env.NODE_ENV = production variables', () => {
            process.env.NODE_ENV = 'production';
            const testedModule = require('../../src/config/config').default
            expect(testedModule.WRAPPER_URL).toBe("https://localhost:/cypress/toc-wrapper/index.html")
            expect(testedModule.TCM_DASHBOARD_UI_URL).toBe('https://localhost:/cypress/trackchanges/index.html')
        });
        it('will receive process.env.NODE_ENV not given', () => {
            process.env.NODE_ENV = '';
            const testedModule = require('../../src/config/config').default
            expect(testedModule.WRAPPER_URL).toBe("https://local-dev.pearson.com:4000")
        });
    });
});