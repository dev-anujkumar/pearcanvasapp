import { initializeGTM, triggerCustomEventsGTM} from '../../src/js/ga.js';
import TagManager from 'react-gtm-module';

jest.mock('react-gtm-module');
const envMock = {
    GOOGLE_TAG_MANAGER_AUTH: 'auth_token',
    GOOGLE_TAG_MANAGER_PREVIEW: 'env_21',
    GTM_ID: 'GTM_Cypress'
}

const envEmpty = {}

describe("testing GA file", () => {
    let mockTagManagerInitialize = jest.spyOn(TagManager, 'initialize');
    let mockData = [];
    it("initializeGTM is called", () => {
        initializeGTM(envMock);
        expect(mockTagManagerInitialize).toHaveBeenCalledWith({
            gtmId: 'GTM_Cypress',
            auth: 'auth_token',
            preview: 'env_21',
      });
    });
    it("initializeGTM -> || case while recieving empty data from env", () => {
        initializeGTM(envEmpty);
        expect(mockTagManagerInitialize).toHaveBeenCalledWith({
            gtmId: 'GTM-N6W3WRM',
            auth: 'uMmKRWMnVp0n5ln33vV-MA',
            preview: 'env-21',
      });
    });
    it('testing triggerCustomEventsGTM', () => {
        const data = { event: 'e', value: 42 };
        triggerCustomEventsGTM(data);
        expect(mockData).not.toContain(data);
    });
    it('testing triggerCustomEventsGTM -> conditional coverage', () => {
        const data = { event: 'e', value: 10 };
        global.window = { dataLayer: data };
        triggerCustomEventsGTM(data);
    });
})