import * as actions from '../../src/js/slateAncestorData_helpers.js'
import {allSlateData, allSlateData2, allSlateData3, allSlateData4, allSlateData5, currentMatterData} from '../testData/slateAncestorMockData.js'


describe('Testing slateAncestorData_helpers function', () => {

    it('Testing getCurrentSlatesList: Bodymatter: if condition', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData,"bodymatter","urn:pearson:entity:f07aed30-c520-430d-bc4c-e02dfb3b2553")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter: if-if condition', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData,"bodymatter","urn:pearson:entity:2af5690c-c2d9-4a0a-9104-a4f9a262878d")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter: if-if condition', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData4,"bodymatter","urn:pearson:entity:2af5690c-c2d9-4a0a-9104-a4f9a262878d")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter: if-if else condition', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData2,"bodymatter","urn:pearson:manifest:4ed94cfc-766d-49c5-870e-074b4074da0f")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData2,"bodymatter","urn:pearson:entity:f07aed30-c520-430d-bc4c-e02dfb3b2553")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter: else if(container.label == TOC_CONTAINER.VOLUME && container?.contents?.length > 0)', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData2,"bodymatter","urn:pearson:entity:f07aed30-c520-430d-bc4c-e02dfb3b2554")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: Bodymatter: else if(container.label == TOC_CONTAINER.VOLUME && container?.contents?.length > 0) else condition', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData5,"bodymatter","urn:pearson:entity:f07aed30-c520-430d-bc4c-e02dfb3b2554")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing getCurrentSlatesList: backmatter', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData4,"backmatter","urn:pearson:entity:d0922165-b29b-444f-a318-ad739ec81ee0")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing fetchCurrentContainerSlateList: backmatter', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData4,"backmatter","backmatter")
        expect(spyFunction).toHaveBeenCalled()
    })

    it('Testing fetchCurrentContainerSlateList: frontmatter', () => {
        const spyFunction = jest.spyOn(actions,"getCurrentSlatesList");
        let dispatch = (obj) => {
            expect(obj.type).toBe('GET_SLATE_LIST_IN_CONTAINER')
            expect(obj.payload.slateList).toEqual(slateList)
        }
        actions.getCurrentSlatesList(allSlateData4,"frontmatter","frontmatter")
        expect(spyFunction).toHaveBeenCalled()
    })
})