import { SET_CURRENT_SLATE, GET_CURRENT_SLATE, trackChanges, publishContent, releaseLockAndRedirect, logout } from '../../src/js/header.js';
import config from '../../src/config/config';
var current_slate_urn = '';

describe('Header module testing', () => {
    it('Testing SET_CURRENT_SLATE function', () => {
        let urn = '123123'
        SET_CURRENT_SLATE(urn)
    })

    it('Testing GET_CURRENT_SLATE function', () => {
        GET_CURRENT_SLATE()
    })

    xit('Testing releaseLockAndRedirect function', () => {
        releaseLockAndRedirect()
    }) 

    // xit('Testing publishContent if function', () => {
    //     let type = 'slatePreview'
    //     publishContent(type)
    // })

    it('Testing publishContent else function', () => {
        let type = 'projectPreview'
        jest.mock("../../src/js/c4_module", () => {
            let c4PublishObj = {
                publishTitle : jest.fn()
            }
            return c4PublishObj
        })
       
        publishContent(type)
    })

    it('Testing publishContent : else', () => {
        let type = 'test'
        jest.mock("../../src/js/c4_module", () => {
            let c4PublishObj = {}
            return c4PublishObj
        })
       
        publishContent(type)
    })

    it('Testing logout function', () => {
        logout()
    })
    xit('Testing logout function with config', () => {
        config.projectUrn = "projectid"
        config.slateManifestURN = "slateid"
        jest.mock("../../src/component/CanvasWrapper/SlateLock_Actions", () => ({
            releaseSlateLockWithCallback: (mockValue1, mockValue2, cb) => {
                cb();
            }
        }))
        logout()
    })
    xit('Testing logout function mockwindow', () => {
        config.projectUrn = "projectid"
        config.slateManifestURN = "slateid"
        jest.mock("../../src/component/CanvasWrapper/SlateLock_Actions", () => ({
            releaseSlateLockWithCallback: (mockValue1, mockValue2, cb) => {
                cb();
            }
        }))
        const originalWindow = { ...window };
        const windowSpy = jest.spyOn(global, "window", "get");
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            parent: {},
            sessionStorage: {removeItem: ()=>{return false}}
        }));
        logout()
    })
    it('Testing logout function mockwindow', () => {
        config.projectUrn = "projectid"
        config.slateManifestURN = "slateid"
        jest.mock("../../src/component/CanvasWrapper/SlateLock_Actions", () => ({
            releaseSlateLockWithCallback: (mockValue1, mockValue2, cb) => {
                cb();
            }
        }))
        const originalWindow = { ...window };
        const windowSpy = jest.spyOn(global, "window", "get");
        windowSpy.mockImplementation(() => ({
            ...originalWindow,
            parent: {},
            sessionStorage: false
        }));
        logout()
    })
});