import * as helperMethods from '../../../src/component/SlateWrapper/slateWrapperAction_helper';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import { createstoreWithFigure } from "../../../fixtures/slateTestingData";
import { comments } from '../../../fixtures/commentPanelData.js'
import config from '../../../src/config/config';
import { elementAsideWorkExample } from '../../../fixtures/elementAsideData';
import { citationGroupElement } from "../../../fixtures/ElementCitationData";
import { multiColumnContainer } from "../../../fixtures/multiColumnContainer"
import { popup } from "../../../fixtures/ElementPopup"
import { mockNumberedElements } from '../FigureHeader/AutoNumberApiTestData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/config/config.js', () => ({
    slateEntityURN: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
    slateManifestURN: "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0",
    projectUrn: "urn:pearson:distributable:977c95a8-e16a-413c-bfd0-788fd2a3698d",
}))

describe('Tests Slate Wrapper Action helper methods', () => {
    const initialState = {
        appStore : {
            slateLevelData: createstoreWithFigure.slateLevelData,
            activeElement: {},
            splittedElementIndex: 0,
            pageNumberData: {},
            popupSlateData: {
                type: "popup"
            }
        },
        tcmReducer:{tcmSnapshot:["78","9"]},
        commentsPanelReducer: { comments: [] },
        selectionReducer: {
            selection: {
                activeAnimation: true,
                deleteElm: {
                    id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", 
                    type: "element-authoredtext", 
                    parentUrn: undefined, 
                    asideData: undefined,
                    contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"
                },
                element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                inputSubType: "NA",
                inputType: "AUTHORED_TEXT",
                operationType: "copy",
                sourceElementIndex: '0-0-0-0-0',
                sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
            }
        },
        autoNumberReducer:{
            autoNumberedElements: mockNumberedElements,
        }
    }
    config.tcmStatus = true
    config.slateManifestUrn = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";

    const responseData = {
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
        "type": "element-aside",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": ""
        },
        "html": {
            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
        },
        "comments": false,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
    };

    it("onPasteSuccess", async () => {
        const store = mockStore(() => initialState);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e'
            },
            asideData: {
                type: 'showhide',
                sectionType: {
                    type: 'showhide'
                }
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it("onPasteSuccess when response type is not element-aside", async () => {
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e'
            },
            asideData: {
                type: 'showhide',
                sectionType: {
                    type: 'showhide'
                }
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    xit("onPasteSuccess when aside type:  element-aside", async () => {
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                parent: {
                    type: 'groupedcontent'
                }
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    xit("onPasteSuccess when aside type:  element-aside and asidedata parentid is given", async () => {
        // initialState2.selectionReducer.selection.operationType = "cut";
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'groupedcontent'
                },
                subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    xit("onPasteSuccess when aside type:  element-aside and asidedata parentid is given", async () => {
        // initialState2.selectionReducer.selection.operationType = "cut";
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                // index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'groupedcontent'
                },
                subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    xit("onPasteSuccess when aside type:  element-aside,asidedata subtype: workedexample asidedata subtype: workedexample and index length is not 5", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'groupedcontent'
                },
                subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    xit("onPasteSuccess when aside type:  element-aside,asidedata subtype is not workedexample and index length is not 5", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'groupedcontent'
                },
                // subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    xit("onPasteSuccess when aside parent type: showhide,asidedata subtype is workedexample and index length is not 5", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'showhide',
                    showHideType: {
                        type:'hide'
                    }
                },
                subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    xit("onPasteSuccess when aside type: citations,asidedata subtype is not workedexample and index length is not 5", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                // index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'showhide',
                    showHideType: {
                        type:'hide'
                    }
                },
                // subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    xit("onPasteSuccess when aside type: citations,asidedata subtype is not workedexample and index length is not 5 else case", async () => {
        const initialState3 = {
            appStore : {
                slateLevelData: createstoreWithFigure.slateLevelData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                }
            },
            tcmReducer:{tcmSnapshot:["78","9"]},
            commentsPanelReducer: { comments: [] },
            selectionReducer: {
                selection: {
                    activeAnimation: true,
                    deleteElm: {
                        id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", 
                        type: "element-authoredtext", 
                        parentUrn: undefined, 
                        asideData: undefined,
                        contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"
                    },
                    element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                    inputSubType: "NA",
                    inputType: "AUTHORED_TEXT",
                    operationType: "copy",
                    sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                    sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
                }
            }
        }
    
        const store = mockStore(() => initialState3);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'element-aside',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'showhide',
                    showHideType: {
                        type:'hide'
                    }
                },
                // subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    xit("onPasteSuccess when aside parent type: showhide,asidedata subtype is not workedexample and index length is not 5", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'citations',
                sectionType: {
                    type: 'element-aside'
                },
                // index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'showhide',
                    showHideType: {
                        type:'hide'
                    }
                },
                // subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    it("onPasteSuccess when aside parent type: showhide,asidedata subtype is not workedexample and showHideType is not given", async () => {
        initialState.selectionReducer.selection.sourceElementIndex = '0-0-0-0-0-0';
        const store = mockStore(() => initialState);
        const responseData1 = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
            "type": "element-aside",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        };
        const params = {
            responseData: responseData1,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            parentUrn:{
                manifestUrn:'urn:pearson:manifest:44d43f1b-3bdf-4386-a06c-bfa779f27t5e',
                elementType:'manifest'
            },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c542',
                type: 'citations',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'showhide',
                    // showHideType: {
                    //     type:'hide'
                    // }
                },
                // subtype:'workedexample'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });



    it("onPasteSuccess - poetryData - parentUrn", async () => {
        const store = mockStore(() => initialState);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            poetryData: {
                type: 'poetry',
                parent: {
                    showHideType: 'show'
                },
                parentUrn: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b'
            }
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    xit("onPasteSuccess - No poetryData - parentUrn ", async () => {
        const store = mockStore(() => initialState);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            // poetryData: {
            //     type: 'poetry',
            //     parent: {
            //         showHideType: 'show'
            //     },
            //     parentUrn: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b'
            // },
            asideData: {
                id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                type: 'groupedcontent',
                sectionType: {
                    type: 'element-aside'
                },
                index:'0-0-0',
                parent: {
                    id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7',
                    type: 'groupedcontent',
                    // showHideType: {
                    //     type:'hide'
                    // }
                },
                // subtype:'workedexample'
            }

        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });
    it("onPasteSuccess - cut operation", async () => {
        let initialState1 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState1.selectionReducer.selection.operationType = "cut";
        const store = mockStore(() => initialState1);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            elmExist: true
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation -- setting snap to false', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.sourceEntityUrn = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1rf";
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            elmExist: true,
            slateEntityUrn:'urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1rf'
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation - prepareTCMSnapshotsForDelete ', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.sourceSlateEntityUrn = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1rf";
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation having deleteElm present', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.deleteElm.cutCopyParentUrn = {
            id: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979",
            slateLevelData: createstoreWithFigure.slateLevelData
        }
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState,
            elmExist: true
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - selection object is empty ', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection = {};
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation - check for elmSelection', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.sourceSlateEntityUrn = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1yh";
        initialState2.selectionReducer.selection.elmComment = comments;
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation - for null sourceSlateEntityUrn', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        delete initialState2.selectionReducer.selection.sourceSlateEntityUrn;
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation - for null key elmSelection', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.sourceSlateEntityUrn = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1qa";
        initialState2.selectionReducer.selection.elmComment = [];
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it('onPasteSuccess - cut operation - check for elmFeedback in selection data', () => {
        let initialState2 = { ...initialState };
        const checkElementExistence = jest.fn();
        checkElementExistence.mockReturnValue(true);
        initialState2.selectionReducer.selection.operationType = "cut";
        initialState2.selectionReducer.selection.sourceSlateEntityUrn = "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1yh";
        initialState2.selectionReducer.selection.elmFeedback = comments;
        const store = mockStore(() => initialState2);
        const params = {
            responseData: responseData,
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess");
        helperMethods.onPasteSuccess(params);
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params);
    });

    it("onPasteSuccess - approved slate", async () => {
        let slateData = { ...createstoreWithFigure.slateLevelData }
        slateData[config.slateManifestUrn]["status"] = "approved"
        const initialState1 = {
            ...initialState,
            appStore : {
                slateLevelData: slateData,
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {},
                popupSlateData: {
                    type: "popup"
                },
                tcmReducer:{tcmSnapshot:["78","9"]}
            }
        } 
        const store = mockStore(() => initialState1)
        const params = {
            responseData: {},
            index: 3,
            dispatch: jest.fn(),
            getState: store.getState
        }
        const spyonPasteSuccess = jest.spyOn(helperMethods, "onPasteSuccess")
        helperMethods.onPasteSuccess(params)
        expect(spyonPasteSuccess).toHaveBeenCalledWith(params)
    });

    it("handleTCMSnapshotsForCreation ", async () => {
        const params = {
            newParentData : createstoreWithFigure.slateLevelData3[config.slateManifestUrn],
            currentSlateData: createstoreWithFigure.slateLevelData[config.slateManifestUrn],
            asideData: null,
            poetryData: null,
            parentUrn: null,
            type: null,
            responseData: {type: 'popup', popupdata:{
                "formatted-title": {}
            }},
            dispatch: jest.fn(),
        }
        const spyhandleTCMSnapshotsForCreation = jest.spyOn(helperMethods, "handleTCMSnapshotsForCreation")
        helperMethods.handleTCMSnapshotsForCreation(params)
        expect(spyhandleTCMSnapshotsForCreation).toHaveBeenCalledWith(params)
    });

    it("handleTCMSnapshotsForCreation for wip slate status ", async () => {
        const params = {
            newParentData : createstoreWithFigure.slateLevelData3[config.slateManifestUrn],
            currentSlateData: createstoreWithFigure.slateLevelData3[config.slateManifestUrn],
            asideData: null,
            poetryData: null,
            parentUrn: null,
            type: null,
            responseData: {},
            dispatch: jest.fn(),
        };

        const spyhandleTCMSnapshotsForCreation = jest.spyOn(helperMethods, "handleTCMSnapshotsForCreation");
        helperMethods.handleTCMSnapshotsForCreation(params);
        expect(spyhandleTCMSnapshotsForCreation).toHaveBeenCalledWith(params);
    });

    it('testing------- prepareDataForTcmCreate for authored-text ------function', () => {
        const store = mockStore(() => initialState)
        const type = "TEXT";
        const createdElementData = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "type": "element-authoredtext",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": true,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        }
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- prepareDataForTcmCreate for worked-example ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "WORKED_EXAMPLE";
        const createdElementData = elementAsideWorkExample
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- prepareDataForTcmCreate for citation ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "CITATION";
        const type1 = "SECTION_BREAK"
        const createdElementData = citationGroupElement
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        helperMethods.prepareDataForTcmCreate(type1, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- prepareDataForTcmCreate for MultiColumn container ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "MULTI_COLUMN";
        const createdElementData = multiColumnContainer
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- prepareDataForTcmCreate for POP_UP ------function', () => {
        
        const store = mockStore(() => initialState);
        const type = "POP_UP";
        const createdElementData = popup
    
        const spyPrepareDataForTcmCreate = jest.spyOn(helperMethods, 'prepareDataForTcmCreate')
        helperMethods.prepareDataForTcmCreate(type, createdElementData, store.getState, store.dispatch)
        expect(spyPrepareDataForTcmCreate).toHaveBeenCalled()
        expect(spyPrepareDataForTcmCreate).toHaveReturnedWith(undefined);
    });

    it('testing------- checkElementExistence passing slateEntityUrn and elementEntity  ------', () => {
        const slateEntityUrn = 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e';
        const elementEntity = 'element';
        let mock = new MockAdapter(axios);
        const responseData = {
            status: 200,
            data: {}
        };
        mock.onGet(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${slateEntityUrn}/elementids`).reply(200, responseData);
        const spycheckElementExistence = jest.spyOn(helperMethods, 'checkElementExistence');
        helperMethods.checkElementExistence(slateEntityUrn, elementEntity);
        expect(spycheckElementExistence).toHaveBeenCalled();
    });

    it('testing------- checkElementExistence passing no argument for else case ------', () => {
        const spycheckElementExistence = jest.spyOn(helperMethods, 'checkElementExistence');
        helperMethods.checkElementExistence();
        expect(spycheckElementExistence).toHaveBeenCalled();
    });

    it('testing------- setPayloadForContainerCopyPaste - cut-aside ------', () => {
        const params = {
          cutIndex: 1,
          selection: {
            element: {
              type: "element-aside",
              id: "urn:pearson:manifest:12adasd3-123sad334-214dsszefs3",
              contentUrn: "1122"
            },
            operationType: "cut",
            sourceEntityUrn: "123",
          },
          manifestUrn: "urn:pearson:manifest:12adasd3-123sad334-214dssze44",
          containerEntityUrn:
            "urn:pearson:entity:12adasd3-123sad334-214dssze44",
        };

        const expectedValue = {
            "content": [{
                "type": params.selection.element.type,
                "index": params.cutIndex,
                "id": params.selection.element.id,
                "elementParentEntityUrn": params.selection.sourceEntityUrn,
                "contentUrn": params.selection.element.contentUrn
            }]
        }
        const spysetPayloadForContainerCopyPaste = jest.spyOn(helperMethods, 'setPayloadForContainerCopyPaste');
        helperMethods.setPayloadForContainerCopyPaste(params);
        expect(spysetPayloadForContainerCopyPaste).toHaveReturnedWith(expectedValue);
    });
     
    it('testing------- setPayloadForContainerCopyPaste - copy-aside ------', () => {
        const params = {
          cutIndex: 1,
          selection: {
            element: {
              type: "element-aside",
              id: "urn:pearson:manifest:12adasd3-123sad334-214dsszefs3",
              contentUrn: "1122"
            },
            operationType: "copy",
            sourceEntityUrn: "123",
          },
          manifestUrn: "urn:pearson:manifest:12adasd3-123sad334-214dssze44",
          containerEntityUrn: "urn:pearson:entity:12adasd3-123sad334-214dssze44",
        };

        const expectedValue = {
            "content": [{
                "type": params.selection.element.type,
                "index": params.cutIndex,
                "id": params.manifestUrn,
                "contentUrn": params.containerEntityUrn
            }]
        }
        const spysetPayloadForContainerCopyPaste = jest.spyOn(helperMethods, 'setPayloadForContainerCopyPaste');
        helperMethods.setPayloadForContainerCopyPaste(params);
        expect(spysetPayloadForContainerCopyPaste).toHaveReturnedWith(expectedValue);
    });

    it('testing------- fetchStatusAndPaste - copy-aside - success ------', async () => {
        jest.useFakeTimers();
        const params = {
            insertionIndex: 2,
            requestId: "uez4537hskjaz",
            dispatch: jest.fn(),
            pasteElement: jest.fn()
        };

        const mock = new MockAdapter(axios);
        const successResponse = {
          status: 200,
        auditResponse: { status: "SUCCESS", baseContainer: {} },
        };
        mock.onGet(`${config.AUDIO_NARRATION_URL}container/request/${params.requestId}`).reply(200, successResponse);
        const spyfetchStatusAndPaste = jest.spyOn(helperMethods, 'fetchStatusAndPaste');
        helperMethods.fetchStatusAndPaste(params);
        jest.advanceTimersByTime(3000); //Mock code inside setInterval
        expect(spyfetchStatusAndPaste).toHaveBeenCalled();
    });
     
    it('testing------- fetchStatusAndPaste - copy-aside - API fail ------', async () => {
        jest.useFakeTimers();
        const params = {
            insertionIndex: 2,
            requestId: "uez4537hskjaz",
            dispatch: jest.fn(),
            pasteElement: jest.fn()
        };

        const mock = new MockAdapter(axios);
        const failResponse = {
          status: 500,
          data: {"message": "Internal server error"}
        };
        mock.onGet(`${config.AUDIO_NARRATION_URL}container/request/${params.requestId}`).reply(500, failResponse);
        const spyfetchStatusAndPaste = jest.spyOn(helperMethods, 'fetchStatusAndPaste');
        helperMethods.fetchStatusAndPaste(params);
        jest.advanceTimersByTime(3000); //Mock code inside setInterval
        expect(spyfetchStatusAndPaste).toHaveBeenCalled();
    });
})