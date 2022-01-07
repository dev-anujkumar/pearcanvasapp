/**************************Import Modules**************************/
import * as autoNumber_deleteFunctions from '../../../src/component/FigureHeader/AutoNumber_DeleteAndSwap_helpers';
/*************************Import Constants*************************/
import { currentSlateData, mockAutoNumberingDetails, mockIndexedElements, mockNumberedElements,slateFigures2, slateAncestorChapter } from './AutoNumberApiTestData';
const mockSlateFigures = slateFigures2
jest.mock('../../../src/component/FigureHeader/slateLevelMediaMapper.js', () => {
    return {
        getImagesInsideSlates: () => {
            return mockSlateFigures
        }
    }
})
describe('-----------------Testing AutoNumber_DeleteAndSwap_helpers-----------------', () => {
    const mockGetState = () => {
        return {
            autoNumberReducer: {
                isAutoNumberingEnabled: true,
                autoNumberedElements: mockNumberedElements,
                autoNumberingDetails: mockAutoNumberingDetails,
                autoNumberElementsIndex: mockIndexedElements,
                slateFigureList: slateFigures2.splice(4,1),
                autoNumberOption: ''
            },
            appStore: {
                currentSlateAncestorData: slateAncestorChapter
            }
        }
    }
    let dispatch = ()=>{}
    const params = {
        getState: mockGetState,
        dispatch: dispatch,
        type: 'figure',
        contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
        isAutoNumberingEnabled: true,
    }
    it('Test-1---updateAutoNumberSequenceOnDelete---', () => {
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnDelete');
        const result = autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete("urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb", params.contentUrn, mockNumberedElements)(dispatch);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2---handleAutoNumberingOnDelete---', () => {
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete = ()=>{return;}
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    const swapParams =  {
        getState: mockGetState,
        dispatch: dispatch,
        currentSlateData,
        swappedElementData: currentSlateData.contents.bodymatter[0]
    }
    const swapParams2 = { ...swapParams, numberedElements: mockNumberedElements, slateFigures: mockSlateFigures, slateAncestors: slateAncestorChapter }
    it('Test-3---updateAutoNumberSequenceOnSwappingElements---', () => {
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnSwappingElements');
        autoNumber_deleteFunctions.updateAutoNumberSequenceOnSwappingElements(swapParams2);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4---handleAutoNumberingOnSwapping---', () => {
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.updateAutoNumberSequenceOnSwappingElements = ()=>{return;}
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})