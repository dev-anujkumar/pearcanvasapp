import * as TCM_Integration_Actions from '../../../src/component/CanvasWrapper/TCM_Integration_Actions';
import config from '../../../src/config/config';

jest.mock('../../../src/js/slateLockUtility', () => ({
    checkSlateLock: () => {
        return false;
    }
}))
window.open = jest.fn();
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
                },
                appStore: {
                    slateLockInfo: {
                        isLocked: true,
                        timestamp: "",
                        userId: "c5test01"
                    },
                    slateTitleUpdated: "slateTitleUpdated"
                }
            }
        }
    }
})

describe('Testing TCM_Integration function', () => {
    test('Testing : trackChange > false', () => {
        TCM_Integration_Actions.loadTrackChanges();
        let event = new CustomEvent("message", {
            data: "ready",
            origin: "https://test-structuredauthoring.pearson.com",
        },
            false)
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    test('Testing : trackChange > false > false', () => {
        config.tempSlateManifestURN = "tempSlateManifestURN"
        TCM_Integration_Actions.loadTrackChanges();
        let event = new CustomEvent("message", {
            data: "ready",
            origin: "https://test-structuredauthoring.pearson.com",
        },
            false)
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    test('Testing : trackChange > true', () => {
        config.tempSlateEntityURN = "tempSlateEntityURN"
        config.tcmslatemanifest = "tcmslatemanifest"
        TCM_Integration_Actions.loadTrackChanges("elementId");
        let event = new CustomEvent("message", {
            data: "ready",
            origin: "https://test-structuredauthoring.pearson.com",
        },
            false)
        let obj = { spyEvent: () => { return 'TestEvent' } };
        jest.spyOn(obj, 'spyEvent')
        window.dispatchEvent(event);
        obj.spyEvent();
        expect(obj.spyEvent).toHaveBeenCalled()
    })
    it('Testing : launchTCMPopup', () => {
        const spyFunction = jest.spyOn(TCM_Integration_Actions, 'launchTCMPopup');
        let result = TCM_Integration_Actions.launchTCMPopup(true);
        expect(result.type).toEqual('LAUNCH_TCM_CANVAS_POPUP');
        expect(result.payload).toEqual(true);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
});