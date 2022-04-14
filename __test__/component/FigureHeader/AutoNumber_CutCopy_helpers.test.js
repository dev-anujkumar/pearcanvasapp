/**************************Import Modules**************************/
import * as autoNumber_cutcopyFunctions from '../../../src/component/FigureHeader/AutoNumber_CutCopy_helpers';
/*************************Import Constants*************************/
import { currentSlateData, mockAutoNumberingDetails, mockIndexedElements, mockNumberedElements,slateFigures2, slateAncestorChapter,
         selectedElement, mock_autoNumber_ElementTypeKey, asideOnSlateData, cutSelection } from './AutoNumberApiTestData';
describe('-----------------Testing AutoNumber_CutCopy_helpers-----------------', () => {
    const mockGetState = () => {
        return {
            autoNumberReducer: {
                isAutoNumberingEnabled: false,
                autoNumberedElements: mockNumberedElements,
                autoNumberingDetails: mockAutoNumberingDetails,
                autoNumberElementsIndex: mockIndexedElements,
                slateFigureList: slateFigures2,
                autoNumberOption: '',
                autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey
            },
            appStore: {
                currentSlateAncestorData: slateAncestorChapter
            }
        }
    }
    const params = {
        getState: mockGetState,
        dispatch: jest.fn(),
        isAutoNumberingEnabled: true,
        cutSelection: {},
        tocContainerSlateList: ["urn:pearson:entity:35303acf-be7a-4538-a605-7176d417c6ea","urn:pearson:entity:62ad9ae9-1170-45aa-8ba5-85225cb27664"]
    }
    it('Test-1---handleAutoNumberingOnCopyPaste---', async () => {
        params.operationType = 'cut';
        params.selectedElement = selectedElement[0];
        params.currentSlateData = currentSlateData;
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });

    it('Test-2---handleAutoNumberingOnCopyPaste---', async () => {
        params.currentSlateData = asideOnSlateData;
        params. operationType = 'cut';
        params.selectedElement = selectedElement[0];
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });

    it('Test-3---handleAutoNumberingOnCopyPaste---', async () => {
        params.currentSlateData = asideOnSlateData;
        params. operationType = 'cut';
        params.selectedElement = selectedElement[1];
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });

    it('Test-4---handleAutoNumberingOnCopyPaste---', async () => {
        params.currentSlateData = asideOnSlateData;
        params. operationType = 'cut';
        params.selectedElement = selectedElement[2];
        params.cutSelection = cutSelection;
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });
    it('Test-5---handleAutoNumberingOnCopyPaste---', async () => {
        params. operationType = 'cut';
        params.selectedElement = selectedElement[3];
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });

    it('Test-6---handleAutoNumberingOnCopyPaste---', async () => {
        params. operationType = 'copy';
        params.selectedElement = selectedElement[2];
        const mockGetState1 = () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: false,
                    autoNumberedElements: {
                        frontMatter: [],
                        backMatter: []
                    },
                    autoNumberingDetails: mockAutoNumberingDetails,
                    autoNumberElementsIndex: mockIndexedElements,
                    slateFigureList: slateFigures2,
                    autoNumberOption: '',
                    autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey
                },
                appStore: {
                    currentSlateAncestorData: slateAncestorChapter
                }
            }
        }
        params.getState = mockGetState1
        const spyFunction = jest.spyOn(autoNumber_cutcopyFunctions, 'handleAutoNumberingOnCopyPaste');
        await autoNumber_cutcopyFunctions.handleAutoNumberingOnCopyPaste(params);
        expect(spyFunction).toHaveBeenCalled();
    });
});