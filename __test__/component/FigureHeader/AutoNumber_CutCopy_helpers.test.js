/**************************Import Modules**************************/
import * as autoNumber_cutcopyFunctions from '../../../src/component/FigureHeader/AutoNumber_CutCopy_helpers';
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
describe('-----------------Testing AutoNumber_CutCopy_helpers-----------------', () => {
    const mockGetState = () => {
        return {
            autoNumberReducer: {
                isAutoNumberingEnabled: false,
                autoNumberedElements: mockNumberedElements,
                autoNumberingDetails: mockAutoNumberingDetails,
                autoNumberElementsIndex: mockIndexedElements,
                slateFigureList: slateFigures2,
                autoNumberOption: ''
            },
            appStore: {
                currentSlateAncestorData: slateAncestorChapter
            }
        }
    }
    const params = {
        getState: mockGetState,
        dispatch: jest.fn(),
        operationType: 'cut',
        selectedElement: currentSlateData.contents.bodymatter[0],
        isAutoNumberingEnabled: true,
        currentSlateData: currentSlateData
    }
    it('Test-1---handleAutoNumberingOnCopyPaste---', () => {
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        const result = autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})