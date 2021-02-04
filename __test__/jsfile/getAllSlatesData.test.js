import config from '../../src/config/config.js';
import * as actions from '../../src/js/getAllSlatesData.js';
import {allSlatesData,returnAllSlateData} from '../../fixtures/AllSlatesTestData';
jest.mock('../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))


describe('Test getAllSlatesData functions',()=>{
it('Test Function----->fetchAllSlatesData ',()=>{
    const spyFunction = jest.spyOn(actions,'fetchAllSlatesData');
    let dispatch = (obj) => {}
    actions.fetchAllSlatesData()(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
it('Test Function----->getAllSlatesData ',()=>{
    const spyFunction = jest.spyOn(actions,'getAllSlatesData');
    let dispatch = (obj) => {
        actions.prepareAllSlateData()
        expect(typeof(obj)).toBe('function')
    }
    actions.getAllSlatesData()(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
it('Test Function----->prepareAllSlateData ',()=>{
    const spyFunction = jest.spyOn(actions,'prepareAllSlateData');
    let dispatch = (obj) => {
        expect(obj.type).toBe('GET_ALL_SLATES_DATA')
        expect(obj.payload.allSlateData).toEqual(returnAllSlateData)
    }
    actions.prepareAllSlateData(allSlatesData)(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
it('Test Function----->setCurrentSlateAncestorDataAncestorData - Slate in Bodymatter',()=>{
    config.slateManifestURN ='urn:pearson:manifest:68fb57d8-144c-4c00-b1d9-5b4ea9a1384f'
    config.parentEntityUrn='urn:pearson:entity:fc5a6d43-b861-490c-9df5-5843dd4046e4'
    config.projectUrn='urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d'
    config.projectEntityUrn='urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c'
    config.book_title='Test Data'
    config.parentOfParentItem=''
    const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
    let dispatch = (obj) => {
        expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
    }
    actions.setCurrentSlateAncestorData(returnAllSlateData)(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
it('Test Function----->setCurrentSlateAncestorData - Slate in Frontmatter',()=>{
    config.slateManifestURN ='urn:pearson:manifest:7f275000-4518-46af-85c8-3d54b9a0bcb2'
    config.parentEntityUrn='Front Matter'
    config.projectUrn='urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d'
    config.projectEntityUrn='urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c'
    config.book_title='Test Data'
    config.parentOfParentItem='frontmatter'
    const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
    let dispatch = (obj) => {
        expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
    }
    actions.setCurrentSlateAncestorData(returnAllSlateData)(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
it('Test Function----->setCurrentSlateAncestorData - Slate in Backmatter',()=>{
    config.slateManifestURN ='urn:pearson:manifest:214d7b06-b094-4302-9c92-915cd7cccab1'
    config.parentEntityUrn='Back Matter'
    config.projectUrn='urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d'
    config.projectEntityUrn='urn:pearson:entity:3d9363f1-36bb-47ea-8842-9b142027692c'
    config.book_title='Test Data'
    config.parentOfParentItem='backmatter'
    const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
    let dispatch = (obj) => {
        expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
    }
    actions.setCurrentSlateAncestorData(returnAllSlateData)(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
})