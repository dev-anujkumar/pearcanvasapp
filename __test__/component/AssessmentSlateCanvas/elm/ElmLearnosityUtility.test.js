// IMPORT - Module dependencies
import config from '../../../../src/config/config.js';
import * as utilityFunctions from '../../../../src/component/AssessmentSlateCanvas/elm/UtilityFunctions/ElmLearnosityUtility.js';
import { newElmData, CurrentSlateAncestor, sortingData, sortingItemData } from '../../../../fixtures/AssessmentSlateCanvasTestingData';

describe('Test Elm-Learnosity Utility Functions', () => {

    it('Test-getFolderLabel ', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'getFolderLabel');
        utilityFunctions.getFolderLabel('chapter')
        expect(spyFunction).toHaveReturnedWith('C')
    })

    it('Test-setStatus-setSearchButtonStatus-Learnosity', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'setStatus');
        utilityFunctions.setStatus('setSearchButtonStatus', 'learnosity', { openSearch: true }, { openItemTable: false })
        expect(spyFunction).toHaveReturnedWith(true)
    })
    it('Test-setStatus-setSearchButtonStatus-Puf', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'setStatus');
        utilityFunctions.setStatus('setSearchButtonStatus', 'puf', { openSearch: true }, { openItemTable: false })
        expect(spyFunction).toHaveReturnedWith(true)
    })
    it('Test-setStatus-setNavigationBarStatus-Learnosity', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'setStatus');
        utilityFunctions.setStatus('setNavigationBarStatus', 'learnosity', { openSearch: false }, {})
        expect(spyFunction).toHaveReturnedWith(true)
    })
    it('Test-setStatus-setNavigationBarStatus-puf', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'setStatus');
        utilityFunctions.setStatus('setNavigationBarStatus', 'puf', {}, {})
        expect(spyFunction).toHaveReturnedWith(true)
    })
    it('Test-searchAndFilterAssessmentData ', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'searchAndFilterAssessmentData');
        utilityFunctions.searchAndFilterAssessmentData('learnosity', 'assessment', newElmData)
        expect(spyFunction).toHaveBeenCalledWith('learnosity', 'assessment', newElmData)
    })
    it('Test-tableDataSorting - Assessment Data in Ascending Order', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'tableDataSorting');
        utilityFunctions.tableDataSorting(false, sortingData, 'asc')
        expect(spyFunction).toHaveBeenCalledWith(false, sortingData, 'asc')
    })
    it('Test-tableDataSorting - Item Data in Descending Order', () => {
        const spyFunction = jest.spyOn(utilityFunctions, 'tableDataSorting');
        utilityFunctions.tableDataSorting(true, sortingItemData, 'desc')
        expect(spyFunction).toHaveBeenCalledWith(true, sortingItemData, 'desc')
    })
})

describe('TEST-setParentUrn', () => {
    it('TEST-setParentUrn case1-', () => {
        config.slateManifestURN = "urn:pearson:manifest:bb4e289e-8add-4c30-9f52-33b8fd246f81"
        const spysetParentUrn = jest.spyOn(utilityFunctions, 'setParentUrn')
        utilityFunctions.setParentUrn(JSON.stringify(newElmData), CurrentSlateAncestor.currentSlateAncestorData1);
        expect(spysetParentUrn).toHaveBeenCalled()
        spysetParentUrn.mockClear()
    })
    it('TEST-setParentUrn case2-', () => {
        config.slateManifestURN = "urn:pearson:manifest:50778b02-a808-4a8c-9c7c-923181e1a7fc"
        const spysetParentUrn = jest.spyOn(utilityFunctions, 'setParentUrn')
        utilityFunctions.setParentUrn(JSON.stringify(newElmData), CurrentSlateAncestor.currentSlateAncestorData2);
        expect(spysetParentUrn).toHaveBeenCalled()
        spysetParentUrn.mockClear()
    })
    it('TEST-setParentUrn case3-', () => {
        config.slateManifestURN = "urn:pearson:manifest:2473babc-3182-4639-b36e-4177e03fac03"
        const spysetParentUrn = jest.spyOn(utilityFunctions, 'setParentUrn')
        utilityFunctions.setParentUrn(JSON.stringify(newElmData), CurrentSlateAncestor.currentSlateAncestorData3);
        expect(spysetParentUrn).toHaveBeenCalled()
        spysetParentUrn.mockClear()
    })
    it('TEST-setParentUrn case4-', () => {
        config.slateManifestURN = "urn:pearson:manifest:d29dfda8-73bc-4ad5-bd4a-3381193549d7"
        const spysetParentUrn = jest.spyOn(utilityFunctions, 'setParentUrn')
        utilityFunctions.setParentUrn(JSON.stringify(newElmData), CurrentSlateAncestor.currentSlateAncestorData4);
        expect(spysetParentUrn).toHaveBeenCalled()
        spysetParentUrn.mockClear()
    })
    it('TEST-setParentUrn case1-', () => {
        config.slateManifestURN = "urn:pearson:manifest:bb4e289e-8add-4c30-9f52-33b8fd246f81"
        config.parentLabel = "frontmatter"
        const spysetParentUrn = jest.spyOn(utilityFunctions, 'setParentUrn')
        utilityFunctions.setParentUrn(JSON.stringify(newElmData), CurrentSlateAncestor.currentSlateAncestorData1);
        expect(spysetParentUrn).toHaveBeenCalled()
        spysetParentUrn.mockClear()
    })
})
