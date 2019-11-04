import { SET_CURRENT_SLATE, GET_CURRENT_SLATE, trackChanges, publishContent, releaseLockAndRedirect, toggleCommentsPanel } from '../../src/js/header.js';
jest.mock("../../src/js/auth_module", () => {
    let OPEN_AM = {
        logout: jest.fn()
    }
    return OPEN_AM
})

var current_slate_urn = '';

describe('Header module testing', () => {
    it('Testing SET_CURRENT_SLATE function', () => {
        let urn = '123123'
        SET_CURRENT_SLATE(urn)
    })

    it('Testing GET_CURRENT_SLATE function', () => {
        GET_CURRENT_SLATE()
    })

    it('Testing releaseLockAndRedirect function', () => {
        releaseLockAndRedirect()
    }) 

    it('Testing publishContent if function', () => {
        let type = 'slatePreview'
        publishContent(type)
    })

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

    it('Testing trackChanges function', () => {
        trackChanges()
    })
});