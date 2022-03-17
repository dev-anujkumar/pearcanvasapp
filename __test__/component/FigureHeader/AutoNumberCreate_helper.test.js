/**************************Import Modules**************************/
import config from '../../../src/config/config';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as autonumbercreate_helper from '../../../src/component/FigureHeader/AutoNumberCreate_helper';
import * as slateLevelMediaMapper from '../../../src/component/FigureHeader/slateLevelMediaMapper';
import { autoNumberingSlateData, mock_autoNumber_ElementTypeKey, allSlateData, slateData1, slateData2, slateData3, slateData4, slateData5, slateData6, autoNumberSlateData, mockAutoNumberingDetails, mockIndexedElements, mockNumberedElements,slateFigures2, slateAncestorFM, slateAncestorChapter, elementsArr, elementObj } from './AutoNumberApiTestData';
import { UPDATE_POPUP_PARENT_SLATE } from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('-----------------Testing AutoNumberCreate_helper-----------------', () => {
    let initialState = {
        appStore: {
            currentSlateAncestorData: slateAncestorChapter,
            slateLevelData: autoNumberSlateData,
            allSlateData: allSlateData
        },
        autoNumberReducer: {
            isAutoNumberingEnabled: true,
            autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
            autoNumberedElements: mockNumberedElements,
            autoNumberingDetails: mockAutoNumberingDetails,
            autoNumberElementsIndex: mockIndexedElements,
            slateFigureList: slateFigures2,
            autoNumberOption: '',
            popupParentSlateData: {
                isPopupSlate: false
            }
        }
    };
    describe('Test-1 updateCreatedElementInAutonumberList-----------------', () => {
        it('Test-1.1---updateCreatedElementInAutonumberList', () => {
            const mediaType = 'asidesList';
            const mediaList = [];
            const autoNumberedElementsObj = {
                isAutoNumberingEnabled: false,
                autoNumberedElements: mockNumberedElements,
                autoNumberingDetails: mockAutoNumberingDetails,
                autoNumberElementsIndex: mockIndexedElements,
                slateFigureList: slateFigures2,
                autoNumberOption: ''
            };
            const store = mockStore(() => initialState);
            const spyUpdateCreatedElementInAutonumberList  = jest.spyOn(autonumbercreate_helper, 'updateCreatedElementInAutonumberList');
            autonumbercreate_helper.updateCreatedElementInAutonumberList(mediaType, mediaList, autoNumberedElementsObj.autoNumberedElements, store.dispatch);
            expect(spyUpdateCreatedElementInAutonumberList).toHaveBeenCalled();
            spyUpdateCreatedElementInAutonumberList.mockClear();
        });

        it('Test-1.2---findNearestElement for index > 0', () => {
            const labelType = 'Figure';
            const spyFindNearestElement  = jest.spyOn(autonumbercreate_helper, 'findNearestElement');
            autonumbercreate_helper.findNearestElement(elementsArr, elementObj, labelType);
            expect(spyFindNearestElement).toHaveBeenCalled();
            spyFindNearestElement.mockClear();
        });

        it('Test-1.3---findNearestElement for index === 0', () => {
            const labelType = 'Figure';
            let element = {
                ...elementObj,
                indexPos: 0
            }
            const spyFindNearestElement  = jest.spyOn(autonumbercreate_helper, 'findNearestElement');
            autonumbercreate_helper.findNearestElement(elementsArr, element, labelType);
            expect(spyFindNearestElement).toHaveBeenCalled();
            spyFindNearestElement.mockClear();
        });

        it('Test-1.4---findNearestElement for index > elementArr.length', () => {
            const labelType = 'Fig';
            let element = {
                ...elementObj,
                indexPos: 5
            }
            const spyFindNearestElement  = jest.spyOn(autonumbercreate_helper, 'findNearestElement');
            autonumbercreate_helper.findNearestElement(elementsArr, element, labelType);
            expect(spyFindNearestElement).toHaveBeenCalled();
            spyFindNearestElement.mockClear();
        });

        it('Test-1.5---findNearestElement for index === 0 conditional coverage', () => {
            const labelType = 'Fig';
            let element = {
                ...elementObj,
                indexPos: 0
            }
            const spyFindNearestElement  = jest.spyOn(autonumbercreate_helper, 'findNearestElement');
            autonumbercreate_helper.findNearestElement(elementsArr, element, labelType);
            expect(spyFindNearestElement).toHaveBeenCalled();
            spyFindNearestElement.mockClear();
        });

        it('Test-1.6---handleAutonumberingOnCreate for IMAGE', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });

            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.7---handleAutonumberingOnCreate for IMAGE conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData2);
            });

            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.8---handleAutonumberingOnCreate for IMAGE conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData3);
            });
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.9---handleAutonumberingOnCreate for IMAGE conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData4);
            });
            config.slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098085e";
            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.10---handleAutonumberingOnCreate for IMAGE conditional coverage', () => {
            let mock_NumberedElements = {
                ...mockAutoNumberingDetails,
                'imagesList': {
                    'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb': []
                }
            }
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    autoNumberedElements: mock_NumberedElements,
                }
            };
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.11---handleAutonumberingOnCreate for IMAGE conditional coverage', () => {
            let mock_NumberedElements = {
                ...mockAutoNumberingDetails,
                'imagesList': {}
            }
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    autoNumberedElements: mock_NumberedElements,
                }
            };
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.12---handleAutonumberingOnCreate for CONTAINER conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });
            let element = {
                ...elementObj,
                displayedlabel: 'element-aside'
            } 

            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('CONTAINER', element));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.13---handleAutonumberingOnCreate for conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });

            const store = mockStore(() => initialState);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('SHOW_HIDE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.14---handleAutonumberingOnCreate for popup slate', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate').mockImplementation(() => {
                return Promise.resolve(slateData1);
            });
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    popupParentSlateData: {
                        contentUrn: "urn:pearson:entity:b8d20961-11f5-4a29-a4a4-2446484ab4ab",
                        index: 1,
                        isPopupSlate: true,
                        parentSlateEntityUrn: "urn:pearson:entity:af0f2e23-696b-4b5d-802b-1e173f5c815c",
                        parentSlateId: "urn:pearson:manifest:c9659c44-b3f1-4392-aece-e60b4f8d459f",
                        versionUrn: "urn:pearson:manifest:571af729-f0ab-46af-9c1a-89feefc4516c"
                    }
                }
            };

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.15---handleAutonumberingOnCreate for popup slate conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate')
            .mockImplementationOnce(() => { return Promise.resolve(slateData4) })
            .mockImplementationOnce(() => { return Promise.resolve(slateData2) })
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    popupParentSlateData: {
                        contentUrn: "urn:pearson:entity:b8d20961-11f5-4a29-a4a4-2446484ab4ab",
                        index: 1,
                        isPopupSlate: true,
                        parentSlateEntityUrn: "urn:pearson:entity:af0f2e23-696b-4b5d-802b-1e173f5c815c",
                        parentSlateId: "urn:pearson:manifest:c9659c44-b3f1-4392-aece-e60b4f8d459f",
                        versionUrn: "urn:pearson:manifest:571af729-f0ab-46af-9c1a-89feefc4516c"
                    }
                }
            };

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.16---handleAutonumberingOnCreate for popup slate conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate')
            .mockImplementationOnce(() => { return Promise.resolve(slateData4) })
            .mockImplementationOnce(() => { return [] })
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    popupParentSlateData: {
                        contentUrn: "urn:pearson:entity:b8d20961-11f5-4a29-a4a4-2446484ab4ab",
                        index: 1,
                        isPopupSlate: true,
                        parentSlateEntityUrn: "urn:pearson:entity:af0f2e23-696b-4b5d-802b-1e173f5c815c",
                        parentSlateId: "urn:pearson:manifest:c9659c44-b3f1-4392-aece-e60b4f8d459f",
                        versionUrn: "urn:pearson:manifest:571af729-f0ab-46af-9c1a-89feefc4516c"
                    }
                }
            };

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.17---handleAutonumberingOnCreate for popup slate conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAutoNumberedElementsOnSlate')
            .mockImplementationOnce(() => { return Promise.resolve(slateData4) })
            .mockImplementationOnce(() => { return Promise.resolve(slateData4) })
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    popupParentSlateData: {
                        contentUrn: "urn:pearson:entity:b8d20961-11f5-4a29-a4a4-2446484ab4ab",
                        index: 1,
                        isPopupSlate: true,
                        parentSlateEntityUrn: "urn:pearson:entity:af0f2e23-696b-4b5d-802b-1e173f5c815c",
                        parentSlateId: "urn:pearson:manifest:c9659c44-b3f1-4392-aece-e60b4f8d459f",
                        versionUrn: "urn:pearson:manifest:571af729-f0ab-46af-9c1a-89feefc4516c"
                    }
                }
            };

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('IMAGE', elementObj));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.18---handleAutonumberingOnCreate for popup slate conditional coverage', () => {
            jest.spyOn(slateLevelMediaMapper, 'getAsideElementsWrtKey').mockImplementation(() => {
                return []
            });
            let initialState2 = {
                ...initialState,
                autoNumberReducer: {
                    ...initialState.autoNumberReducer,
                    popupParentSlateData: {
                        contentUrn: "urn:pearson:entity:b8d20961-11f5-4a29-a4a4-2446484ab4ab",
                        index: 1,
                        isPopupSlate: true,
                        parentSlateEntityUrn: "urn:pearson:entity:af0f2e23-696b-4b5d-802b-1e173f5c815c",
                        parentSlateId: "urn:pearson:manifest:c9659c44-b3f1-4392-aece-e60b4f8d459f",
                        versionUrn: "urn:pearson:manifest:571af729-f0ab-46af-9c1a-89feefc4516c"
                    }
                }
            };
            let element = {
                ...elementObj,
                displayedlabel: 'Aside'
            } 

            const store = mockStore(() => initialState2);
            const spyHandleAutonumberingOnCreate = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingOnCreate');
            store.dispatch(autonumbercreate_helper.handleAutonumberingOnCreate('CONTAINER', element));
            expect(spyHandleAutonumberingOnCreate).toHaveBeenCalled();
            spyHandleAutonumberingOnCreate.mockClear();
        });

        it('Test-1.19---handleAutonumberingForElementsInContainers conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            const bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData5[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData5, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.20---handleAutonumberingForElementsInContainers conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            config.slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098085e";
            const bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData6[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.21---handleAutonumberingForElementsInContainers conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            const bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData6[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, [], 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.22---handleAutonumberingForElementsInContainers MULTI_COLUMN conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            bodyMatter[0].groupeddata.bodymatter[0].groupdata.bodymatter = [];
            const getState = jest.fn();
            const dispatch = jest.fn();
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData6[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            bodyMatter[0].groupeddata.bodymatter = [];
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData6[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.23---handleAutonumberingForElementsInContainers SHOW_HIDE conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['1', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.24---handleAutonumberingForElementsInContainers SHOW_HIDE conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            bodyMatter[1].interactivedata.hide = [];
            bodyMatter[1].interactivedata.show = [];
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['1', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.25---handleAutonumberingForElementsInContainers ASIDE conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['2', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.26---handleAutonumberingForElementsInContainers ASIDE conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            bodyMatter[2].elementdata.bodymatter = [];
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['2', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.27---handleAutonumberingForElementsInContainers POPUP conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['3', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.28---handleAutonumberingForElementsInContainers POPUP conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            bodyMatter[3].contents.bodymatter = [];
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['3', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.29---handleAutonumberingForElementsInContainers MANIFEST conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['4', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.30---handleAutonumberingForElementsInContainers MANIFEST conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['4', '0']
            let element = {
                ...elementObj,
                type: 'element-aside'
            }
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], element, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.31---handleAutonumberingForElementsInContainers MANIFEST conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            bodyMatter[4].contents.bodymatter = [];
            const getState = jest.fn();
            const dispatch = jest.fn();
            let slateData = slateData6;
            slateData[0].indexPos = ['4', '0']
            const spyHandleAutonumberingForElementsInContainers = jest.spyOn(autonumbercreate_helper, 'handleAutonumberingForElementsInContainers');
            autonumbercreate_helper.handleAutonumberingForElementsInContainers(bodyMatter, slateData[0], elementObj, mockNumberedElements['imagesList'], slateAncestorChapter, mockNumberedElements, slateData6, 'imagesList', 'Figure', getState, dispatch);
            expect(spyHandleAutonumberingForElementsInContainers).toHaveBeenCalled();
            spyHandleAutonumberingForElementsInContainers.mockClear();
        });

        it('Test-1.32---getSameElementsInsideElement conditional coverage', () => {
            config.slateManifestURN = "urn:pearson:manifest:51aeb4cf-7234-4a0b-8a56-ea7079bcb355";
            let bodyMatter = autoNumberingSlateData[config.slateManifestURN].contents.bodymatter;
            const spyGetSameElementsInsideElement = jest.spyOn(autonumbercreate_helper, 'getSameElementsInsideElement');
            autonumbercreate_helper.getSameElementsInsideElement(bodyMatter, [], elementObj);
            expect(spyGetSameElementsInsideElement).toHaveBeenCalled();
            spyGetSameElementsInsideElement.mockClear();
        });

        it('Test-1.33---checkElementExistenceInOtherSlates conditional coverage', () => {
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorFM
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098085e";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.34---checkElementExistenceInOtherSlates conditional coverage', () => {
            let slateAncestor = {
                ...slateAncestorChapter,
                ancestor: {
                    ...slateAncestorChapter.ancestor,
                    entityUrn: "urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4bc"
                }
            }
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestor
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098085e";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.35---checkElementExistenceInOtherSlates conditional coverage', () => {
            let allSlateDataEmpty = { bodymatter: [] };
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateDataEmpty,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098085e";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.36---checkElementExistenceInOtherSlates conditional coverage', () => {
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d20rt56ee";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.37---checkElementExistenceInOtherSlates conditional coverage', () => {
            let mock_NumberedElements = {
                ...mockNumberedElements,
                'imagesList': {
                    'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb': []
                }
            }
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mock_NumberedElements
                    }
                }
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d20rt56ee";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.38---checkElementExistenceInOtherSlates conditional coverage', () => {
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            jest.spyOn(autonumbercreate_helper, 'findElementInLastSlates').mockImplementation(() => {
                return 0
            });
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098086f";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.39---checkElementExistenceInOtherSlates conditional coverage', () => {
            let mock_NumberedElements = {
                ...mockNumberedElements,
                'imagesList': {
                    'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb': []
                }
            }
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mock_NumberedElements
                    }
                }
            });
            
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098086f";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.40---checkElementExistenceInOtherSlates conditional coverage', () => {
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestorChapter
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            let element = {
                ...elementObj,
                displayedlabel: 'Element'
            }
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098086f";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(element, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.41---checkElementExistenceInOtherSlates conditional coverage', () => {
            let slateAncestor = {
                ...slateAncestorFM,
                matterType: 'Frontmatter'
            }
            const getState = jest.fn(() => {
                return {
                    appStore: {
                        allSlateData: allSlateData,
                        currentSlateAncestorData: slateAncestor
                    },
                    autoNumberReducer: {
                        isAutoNumberingEnabled: true,
                        autoNumber_ElementTypeKey: mock_autoNumber_ElementTypeKey,
                        autoNumberedElements: mockNumberedElements
                    }
                }
            });
            
            const dispatch = jest.fn();
            let slateEntityURN = "urn:pearson:entity:cb477afb-bfcf-4eb3-968a-8a9d2098086f";
            const spyCheckElementExistenceInOtherSlates = jest.spyOn(autonumbercreate_helper, 'checkElementExistenceInOtherSlates');
            autonumbercreate_helper.checkElementExistenceInOtherSlates(elementObj, slateEntityURN, getState, dispatch);
            expect(spyCheckElementExistenceInOtherSlates).toHaveBeenCalled();
            spyCheckElementExistenceInOtherSlates.mockClear();
        });

        it('Test-1.42---savePopupParentSlateData', () => {
            const store = mockStore(() => initialState);
            const expectedActions = [
                { 
                    type: UPDATE_POPUP_PARENT_SLATE,
                    payload: {}
                }
              ]
            const spySavePopupParentSlateData  = jest.spyOn(autonumbercreate_helper, 'savePopupParentSlateData') 
            autonumbercreate_helper.savePopupParentSlateData({}, store.dispatch);
            expect(spySavePopupParentSlateData).toHaveBeenCalled();
            store.dispatch(autonumbercreate_helper.savePopupParentSlateData({}));
            expect(store.getActions().type).toEqual(expectedActions.type);
            spySavePopupParentSlateData.mockClear();
        })

        it('Test-1.43---appendElementToList conditional coverage', () => {
            let mock_NumberedElements = {
                ...mockNumberedElements,
                'imagesList': {
                    'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb': []
                }
            }
            const slateEntityForAutonumber = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
            const dispatch = jest.fn();
            const spyAppendElementToList = jest.spyOn(autonumbercreate_helper, 'appendElementToList');
            autonumbercreate_helper.appendElementToList(elementsArr, elementObj, 'Figure', mock_NumberedElements['imagesList'], slateEntityForAutonumber, 'imagesList', mock_NumberedElements, dispatch);
            expect(spyAppendElementToList).toHaveBeenCalled();
            spyAppendElementToList.mockClear();
        });

        it('Test-1.44---appendElementToList conditional coverage', () => {
            const slateEntityForAutonumber = 'urn:pearson:entity:4bffec29-d3d3-48e2-a42d-e9df091bf4cb';
            const dispatch = jest.fn();
            const spyAppendElementToList = jest.spyOn(autonumbercreate_helper, 'appendElementToList');
            autonumbercreate_helper.appendElementToList([], elementObj, 'Figure', mockNumberedElements['imagesList'], slateEntityForAutonumber, 'imagesList', mockNumberedElements, dispatch);
            expect(spyAppendElementToList).toHaveBeenCalled();
            spyAppendElementToList.mockClear();
        });
    })
})