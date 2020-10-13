import config from '../../../src/config/config.js';
import { handleElmPortalEvents } from '../../../src/component/ElementContainer/AssessmentEventHandling.js';

jest.mock('../../../src/js/slateLockUtility', () => ({
    checkSlateLock: () => {
        return false;
    }
}))

jest.mock('../../../src/component/CanvasWrapper/SlateLock_Actions', () => {
    return {
        getSlateLockStatus: function () {
            return {
                type: 'SET_SLATE_LOCK_STATUS',
                payload: {
                    isLocked : false,
                    userId : ""
                }
            }
        },
        releaseSlateLockWithCallback: function () {
            return {
                type: 'SET_LOCK_FLAG',
                payload: false
            }
        }
    }
})

jest.mock('../../../src/appstore/store', () => {
    return {
        getState: () => {
            return {
                slateLockReducer: {
                    slateLockInfo: {
                        isLocked: true,
                        timestamp: "",
                        userId: "c5test01"
                    }
                }
            }
        },
        dispatch: () => {}
    }
});
config.projectUrn = "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d"
config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
config.slateEntityURN = "urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c"
config.tempSlateManifestURN = null
config.tempSlateEntityURN = null
config.isPopupSlate = false
config.page = 0;
config.scrolling = true;
config.totalPageCount = 0;
config.pageLimit = 0;
config.fromTOC = false;
config.isSlateLockChecked = true;
describe('Testing AssessmentEventHandling function', () => {
    test('Test-1-handleElmPortalEvents', () => {
        handleElmPortalEvents('add');
        let event = new CustomEvent("message", {
            data: {
                source: 'elm',
                action: 'approve'
            },
            origin: "https://assessmentauthoring-dev.pearson.com",
        },
            false)
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        handleElmPortalEvents('remove');
        expect(obj.spyEvent).toHaveBeenCalled()
    })
});
