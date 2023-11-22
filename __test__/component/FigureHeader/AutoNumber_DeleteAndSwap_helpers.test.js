import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
/**************************Import Modules**************************/
import * as autoNumber_deleteFunctions from '../../../src/component/FigureHeader/AutoNumber_DeleteAndSwap_helpers';
import * as AutoNumberActions from '../../../src/component/FigureHeader/AutoNumberActions';
import * as slateLevelMediaMapper from '../../../src/component/FigureHeader/slateLevelMediaMapper.js';
/*************************Import Constants*************************/
import {currentSlateData, elementObj, autoNumberingSlateData, slateData1, mock_autoNumber_KeyMapper, mock_autoNumber_ElementTypeKey, mock_autoNumber_response_ElementType_mapper, mock_autoNumber_IndexMapper, mockAutoNumberingDetails, mockIndexedElements, mockNumberedElements, slateFigures2, slateAncestorChapter } from './AutoNumberApiTestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('-----------------Testing AutoNumber_DeleteAndSwap_helpers-----------------', () => {
    const mockGetState = () => {
        return {
            autoNumberReducer: {
                isAutoNumberingEnabled: true,
                autoNumberedElements: mockNumberedElements,
                autoNumberingDetails: mockAutoNumberingDetails,
                autoNumberElementsIndex: mockIndexedElements,
                slateFigureList: slateFigures2.splice(4, 1),
                autoNumberOption: '',
                popupParentSlateData: {
                    isPopupSlate: false
                },
                autoNumber_KeyMapper: mock_autoNumber_KeyMapper,
                autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                autoNumber_response_ElementType_mapper: mock_autoNumber_response_ElementType_mapper,
                autoNumber_IndexMapper: mock_autoNumber_IndexMapper
            },
            appStore: {
                currentSlateAncestorData: slateAncestorChapter
            }
        }
    }
    let dispatch = () => { }
    it('Test-1.1---handleAutoNumberingOnDelete---', () => {
        const params = {
            getState: mockGetState,
            dispatch: dispatch,
            type: 'figure',
            contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
            isAutoNumberingEnabled: true,
        }
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.2---handleAutoNumberingOnDelete---on popup slate', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: true,
                    autoNumberedElements: mockNumberedElements,
                    autoNumberingDetails: mockAutoNumberingDetails,
                    autoNumberElementsIndex: mockIndexedElements,
                    slateFigureList: slateFigures2.splice(4, 1),
                    autoNumberOption: '',
                    popupParentSlateData: {
                        isPopupSlate: true
                    },
                    autoNumber_KeyMapper: mock_autoNumber_KeyMapper,
                    autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                    autoNumber_response_ElementType_mapper: mock_autoNumber_response_ElementType_mapper,
                    autoNumber_IndexMapper: mock_autoNumber_IndexMapper
                },
                appStore: {
                    slateLevelData: autoNumberingSlateData,
                    currentSlateAncestorData: slateAncestorChapter
                }
            }
        }
        let dispatch = () => { }
        let params = {
            getState: mockGetState,
            dispatch: dispatch,
            type: 'element-aside',
            contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
            isAutoNumberingEnabled: true,
        }
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        params = {...params, type: 'element'};
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.3---handleAutoNumberingOnDelete---conditional coverage', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    autoNumberedElements: mockNumberedElements,
                    popupParentSlateData: {
                        isPopupSlate: true
                    },
                },
                appStore: {
                    currentSlateAncestorData: slateAncestorChapter
                }
            }
        }
        let dispatch = () => { }
        let params = {
            getState: mockGetState,
            dispatch: dispatch,
            type: 'element-aside',
            contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
            isAutoNumberingEnabled: false,
        }
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.4---handleAutoNumberingOnDelete---conditional coverage', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    popupParentSlateData: {
                        isPopupSlate: false
                    },
                },
                appStore: {
                    currentSlateAncestorData: slateAncestorChapter
                }
            }
        }
        let dispatch = () => { }
        let params = {
            getState: mockGetState,
            dispatch: dispatch,
            type: 'element-aside',
            contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
            isAutoNumberingEnabled: true,
        }
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-1.5---handleAutoNumberingOnDelete---conditional coverage', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    autoNumberedElements: mockNumberedElements,
                    popupParentSlateData: {
                        isPopupSlate: false
                    },
                },
                appStore: {
                    currentSlateAncestorData: {}
                }
            }
        }
        let dispatch = () => { }
        let params = {
            getState: mockGetState,
            dispatch: dispatch,
            type: 'element-aside',
            contentUrn: "urn:pearson:entity:382569c4-7080-448e-9a38-5492b7b61783",
            isAutoNumberingEnabled: true,
        }
        config.slateEntityURN = 'urn:pearson:entity:2d02771b-56fb-4f92-99c1-82da25751396';
        config.slateManifestURN = 'urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnDelete');
        autoNumber_deleteFunctions.handleAutoNumberingOnDelete(params);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2.1---updateAutoNumberSequenceOnDelete ---conditional coverage', () => {
        const store = mockStore(() => {});
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        const contentUrn = 'urn:pearson:entity:870b0a62-da95-46c2-b38a-985e95c9427d';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnDelete');
        store.dispatch(autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete(parentIndex, contentUrn, mockNumberedElements));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2.2---updateAutoNumberSequenceOnDelete ---conditional coverage', () => {
        const store = mockStore(() => {});
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        const contentUrn = 'urn:pearson:entity:af956bb8-cf9c-4db4-b904-205c0a194d3d';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnDelete');
        store.dispatch(autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete(parentIndex, contentUrn, mockNumberedElements));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2.3---updateAutoNumberSequenceOnDelete ---conditional coverage', () => {
        const store = mockStore(() => {});
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cd';
        const contentUrn = 'urn:pearson:entity:af956bb8-cf9c-4db4-b904-205c0a194d3b';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnDelete');
        store.dispatch(autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete(parentIndex, contentUrn, mockNumberedElements));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-2.4---updateAutoNumberSequenceOnDelete ---conditional coverage', () => {
        const store = mockStore(() => {});
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        const contentUrn = '';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'updateAutoNumberSequenceOnDelete');
        store.dispatch(autoNumber_deleteFunctions.updateAutoNumberSequenceOnDelete(parentIndex, contentUrn, mockNumberedElements));
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-3.1---deleteElementByLabelFromStore ---conditional coverage', () => {
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        let element = {...elementObj, contentUrn: 'urn:pearson:entity:af956bb8-cf9c-4db4-b904-205c0a194d3b'}
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'deleteElementByLabelFromStore');
        autoNumber_deleteFunctions.deleteElementByLabelFromStore(mockNumberedElements, element, parentIndex);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-3.2---deleteElementByLabelFromStore ---conditional coverage', () => {
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        let element = {...elementObj, contentUrn: 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb'}
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'deleteElementByLabelFromStore');
        autoNumber_deleteFunctions.deleteElementByLabelFromStore(mockNumberedElements, element, parentIndex);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-3.3---deleteElementByLabelFromStore ---conditional coverage', () => {
        const parentIndex = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'deleteElementByLabelFromStore');
        autoNumber_deleteFunctions.deleteElementByLabelFromStore({}, elementObj, parentIndex);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.1---handleAutoNumberingOnSwapping---', () => {
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: currentSlateData.contents.bodymatter[0]
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.2---handleAutoNumberingOnSwapping---conditional coverage', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: true,
                    autoNumberedElements: mockNumberedElements,
                    autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey
                },
                appStore: {
                    currentSlateAncestorData: {}
                }
            }
        }
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: {
                "contentUrn": "urn:pearson:entity:4ea0ab53-7eff-4e0e-9352-f0904be23521",
                "displayedlabel": "Figure",
                "id": "urn:pearson:work:a30fd0d5-2eff-4363-bfd1-ec1a05c22b40",
                "indexPos": 1,
                "numberedandlabel": true,
                "type": "figure",
                "versionUrn": "urn:pearson:work:a30fd0d5-2eff-4363-bfd1-ec1a05c22b40"
            }
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.3---handleAutoNumberingOnSwapping---conditional coverage', () => {
        const mockGetState = () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: true,
                    autoNumberedElements: mockNumberedElements,
                    autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey
                },
                appStore: {
                    currentSlateAncestorData: {}
                }
            }
        }
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: {
                "contentUrn": "urn:pearson:entity:4ea0ab53-7eff-4e0e-9352-f0904be23521",
                "displayedlabel": "Figure",
                "id": "urn:pearson:work:a30fd0d5-2eff-4363-bfd1-ec1a05c22b40",
                "indexPos": 1,
                "numberedandlabel": true,
                "type": "figure",
                "versionUrn": "urn:pearson:work:a30fd0d5-2eff-4363-bfd1-ec1a05c22b40"
            }
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve([elementObj]);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.4---handleAutoNumberingOnSwapping---conditional coverage', () => {
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: {
                "contentUrn": "urn:pearson:entity:4ea0ab53-7eff-4e0e-9352-f0904be23521",
                "type": "figure",
                "versionUrn": "urn:pearson:work:a30fd0d5-2eff-4363-bfd1-ec1a05c22b40"
            }
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve([]);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.5---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[0];
        swappedElementData.groupeddata.bodymatter[0].groupdata.bodymatter[1].contentUrn = 'urn:pearson:entity:dbad2887-96d8-4711-9382-d48a7cef48e3';
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.6---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[3];
        let popupData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[4];
        popupData.type = 'popup';
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.7---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[4];
        swappedElementData.type = 'popup';
        let popupData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[4];
        popupData.type = 'popup';
        popupData.contents = {};
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve([autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2]]);
        });
        jest.spyOn(AutoNumberActions, 'getSlateLevelData').mockImplementation(() => {
            return Promise.resolve(popupData);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.8---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2];
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve([autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2]]);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.9---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2];
        swappedElementData.elementdata.bodymatter = [];
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve([autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2]]);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.10---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[0];
        swappedElementData.groupeddata.bodymatter = [];
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });
        jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
            return Promise.resolve([autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[2]]);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test-4.11---handleAutoNumberingOnSwapping---conditional coverage', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[0];
        swappedElementData.type = 'element';
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(undefined);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
    it('Test-4.12---handleAutoNumberingOnSwapping---conditional coverage', () => {
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: {}
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(undefined);
        });
        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(false, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test- getSwappedElementsURN > case containerElements.GROUP', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[5];
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });

        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });

    it('Test- getSwappedElementsURN >  case containerElements.MULTI_COLUMN > else', () => {
        let swappedElementData = autoNumberingSlateData['urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355'].contents.bodymatter[6];
        const swapParams =  {
            getState: mockGetState,
            dispatch: dispatch,
            currentSlateData,
            swappedElementData: swappedElementData
        }
        jest.spyOn(slateLevelMediaMapper, 'getImagesInsideSlates').mockImplementation(() => {
            return Promise.resolve(slateData1);
        });

        const spyFunction = jest.spyOn(autoNumber_deleteFunctions, 'handleAutoNumberingOnSwapping');
        autoNumber_deleteFunctions.handleAutoNumberingOnSwapping(true, swapParams);
        expect(spyFunction).toHaveBeenCalled();
        spyFunction.mockClear();
    });
})