import config from '../../src/config/config.js';
import * as actions from '../../src/js/getAllSlatesData.js';
import {allSlatesData,returnAllSlateData, returnAllSlateDataElse, returnAllSlateDataEmpty, returnFrontmatter} from '../../fixtures/AllSlatesTestData';
import { communicationAssessmentSlateData } from '../../fixtures/slateTestingData'
jest.mock('../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
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
it('Test Function----->fetchAnySlateData ',()=>{
    const spyFunction = jest.spyOn(actions,'fetchAnySlateData');
    let dispatch = (obj) => {
        expect(obj.type).toBe('SET_REQUIRED_SLATE_DATA')
        expect(obj.payload.getRequiredSlateData).toEqual(communicationAssessmentSlateData.getRequiredSlateData)
    }
    actions.fetchAnySlateData(communicationAssessmentSlateData.getRequiredSlateData)(dispatch)
    expect(spyFunction).toHaveBeenCalled()
})
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - backmatter',()=>{
        config.parentOfParentItem='backmatter'
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnAllSlateDataEmpty)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - frontmatter',()=>{
        config.parentOfParentItem='frontmatter'
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnAllSlateDataEmpty)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - default - frontmatter',()=>{
        config.parentLabel= 'frontmatter'
        config.parentOfParentItem=''
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnFrontmatter)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - default - frontmatter',()=>{
        config.parentLabel= 'frontmatter'
        config.parentOfParentItem=''
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnAllSlateDataEmpty)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - default - backmatter',()=>{
        config.parentLabel= 'backmatter'
        config.parentOfParentItem=''
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnAllSlateDataEmpty)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->setCurrentSlateAncestorData - Conditional Coverage - default - backmatter',()=>{
        config.parentLabel= 'BodyMatter'
        config.parentOfParentItem=''
        const spyFunction = jest.spyOn(actions,'setCurrentSlateAncestorData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_CURRENT_SLATE_DATA')
        }
        actions.setCurrentSlateAncestorData(returnAllSlateDataEmpty)(dispatch)
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
    it('Test Function----->fetchAnySlateData ',()=>{
        const spyFunction = jest.spyOn(actions,'fetchAnySlateData');
        let dispatch = (obj) => {
            expect(obj.type).toBe('SET_REQUIRED_SLATE_DATA')
            expect(obj.payload.getRequiredSlateData).toEqual(communicationAssessmentSlateData.getRequiredSlateData)
        }
        actions.fetchAnySlateData(communicationAssessmentSlateData.getRequiredSlateData)(dispatch)
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Test Function----->currentNodeAncestorData - setCurrentNodeAncestorDataDetails --if', () => {
        const getState = () => {
            return {
                appStore: {
                    allSlateData: {
                        backmatter: [{matterType: "backmatter", label: "appendix", entityUrn: "testUrn", containerUrn: "testContainerUrn", content: {label: "appendixslate", entityUrn: "testurn1", containerUrn: "testContainerUrn"}}],
                        bodymatter: [{matterType: "bodymatter", label: "chapter", entityUrn: "testUrn", containerUrn: "testContainerUrn", content: {label: "section", entityUrn: "testurn1", containerUrn: "testContainerUrn"}}],
                        frontmatter: [{matterType: "frontmatter", label: "assessment-slate", entityUrn: "testUrn", containerUrn: "testContainerUrn"}],
                    },
                }
            };
        }
        const item = {
            containerUrn: "testContainerUrn",
            entityUrn: "testUrn",
            label: "section",
            unformattedTitle: {en: "test"},
            type: "container"
        }
      const spyFunction = jest.spyOn(actions, 'currentNodeAncestorData')
      actions.currentNodeAncestorData(item, "backmatter")("dispatch", getState)
      expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->currentNodeAncestorData - setCurrentNodeAncestorDataDetails --else', () => {
        const getState = () => {
            return {
                appStore: {
                    allSlateData: {
                        backmatter: [{matterType: "backmatter", label: "appendix", entityUrn: "testUrn", containerUrn: "testContainerUrn", contents: {label: "appendixslate", entityUrn: "testurn1", containerUrn: "testContainerUrn"}}],
                        bodymatter: [{matterType: "bodymatter", label: "chapter", entityUrn: "test", containerUrn: "testUrn", contents: {label: "section", entityUrn: "testurn1", containerUrn: "testUrn"}}],
                        frontmatter: [{matterType: "frontmatter", label: "assessment-slate", entityUrn: "testUrn", containerUrn: "testContainerUrn"}],
                    },
                }
            };
        }
        const item = {
            containerUrn: "testContainerUrn",
            entityUrn: "testUrn",
            label: "section",
            unformattedTitle: {en: "test"},
            type: "container"
        }
      const spyFunction = jest.spyOn(actions, 'currentNodeAncestorData')
      actions.currentNodeAncestorData(item, "bodymatter")("dispatch", getState)
      expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->currentNodeAncestorData - Conditional Coverage - default - backmatter', () => {
        const getState = () => {
            return {
                appStore: {
                    allSlateData: {
                        backmatter: [{matterType: "backmatter", label: "appendix", entityUrn: "testUrn", containerUrn: "testContainerUrn", content: {label: "appendixslate", entityUrn: "testurn1", containerUrn: "testContainerUrn"}}],
                        bodymatter: [{matterType: "bodymatter", label: "chapter", entityUrn: "testUrn", containerUrn: "testUrn", content: {label: "section", entityUrn: "testurn1", containerUrn: "testContainerUrn"}}],
                        frontmatter: [{matterType: "frontmatter", label: "assessment-slate", entityUrn: "testUrn", containerUrn: "testUrn"}],
                    },
                }
            };
        }
      config.parentLabel = 'backmatter'
      config.parentOfParentItem = ''
      const spyFunction = jest.spyOn(actions, 'currentNodeAncestorData')
      actions.currentNodeAncestorData({}, "frontmatter")("dispatch", getState)
      expect(spyFunction).toHaveBeenCalled()
    })
    it('Test Function----->currentNodeAncestorData - without matterTypeData', () => {
        const getState = () => {
            return {
                appStore: {
                    allSlateData: {},
                }
            };
        }
      config.parentLabel = 'BodyMatter'
      config.parentOfParentItem = ''
      const spyFunction = jest.spyOn(actions, 'currentNodeAncestorData')
      actions.currentNodeAncestorData({}, "")("dispatch", getState)
      expect(spyFunction).toHaveBeenCalled()
    })
})
