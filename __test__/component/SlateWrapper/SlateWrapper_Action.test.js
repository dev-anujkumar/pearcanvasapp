import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { storeWithFigure,SlatetDataOpenerDefault, SlatetDataOpenerElement, createstoreWithFigure} from "../../../fixtures/slateTestingData"
import { SET_SLATE_TYPE, SET_SLATE_ENTITY, ACCESS_DENIED_POPUP, SET_PARENT_NODE,SWAP_ELEMENT, SET_UPDATED_SLATE_TITLE, AUTHORING_ELEMENT_CREATED,SET_SPLIT_INDEX, GET_PAGE_NUMBER } from '../../../src/constants/Action_Constants';
import config from '../../../src/config/config';
import { elementAside,slateLevelData1, slateLevelData2, asideDataType1, asideDataType2 } from '../../../fixtures/elementAsideData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests Slate Wrapper Actions', () => {
    let store;
    let initialState={appStore : {}};

    beforeEach(() => {
        initialState = {
            appStore : {
                slateLevelData: createstoreWithFigure.slateLevelData,
                // elementsTag: {},
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {}
            }
        };
        store = mockStore(() => initialState);
        moxios.install();
    });
    afterEach(() => moxios.uninstall());

    it('testing------- ADD OPENER ELEMENT ------action', () => {
        initialState = {
            appStore : {
                slateLevelData: SlatetDataOpenerDefault,
                // elementsTag: {},
                activeElement: {},
                splittedElementIndex: 0,
                pageNumberData: {}
            }
        };
        store = mockStore(() => initialState);
        const type = "OPENER";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const axiosPayload = SlatetDataOpenerElement;
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
        return store.dispatch(actions.createElement(type, index)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
        }).catch((err)=>{});;
    });
    it('testing------- SECTION_BREAK ------action', () => {
        let store = mockStore(() => initialState);
        const type = "SECTION_BREAK";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const axiosPayload = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: "SECTION_BREAK",
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
         store.dispatch(actions.createElement(type, index));
         expect(type).toBe(expectedActions.type);
    });
    it('testing------- ASIDE ------action', () => {
        //let store = mockStore(() => initialState);
        const type = "FIGURE";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const axiosPayload = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: "FIGURE",
            payload: { axiosPayload }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: axiosPayload
            });
        });
        let  parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'element-aside', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            expect(type).toBe(expectedActions.type);
        });
    });
    it('testing------- ASIDE ------action when aside and element id same', () => {
        //let store = mockStore(() => initialState);
        const type = "FIGURE";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": type,
            "index": index
        };
        config.slateManifestURN = "urn:pearson:manifest:d91706aa-0e9b-4015-aaef-fb3a9cf46ec0";
        const slateLevelData = createstoreWithFigure.slateLevelData;
        const expectedActions = {
            type: AUTHORING_ELEMENT_CREATED,
            payload: { slateLevelData }

        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: slateLevelData
            });
        });
        let  parentUrn= {
            
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b700"
        }
        return store.dispatch(actions.createElement(type, index, parentUrn, {type : 'element-aside', id:'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7'})).then(() => {
            let { type, payload } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);
            expect(payload).toStrictEqual(expectedActions.payload);
        });
    });
    

    it('testing------- SWAP ELEMENT ------action - then', () => {
        //let store = mockStore(() => initialState);
        const typee = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn":swappedElementData.id,
            "entityUrn":swappedElementData.contentUrn,
            "type": typee,
            "index": index
        }

        let dataObj = {
            oldIndex : 1,
            newIndex : 2,
            swappedElementData : swappedElementData,
            // slateId:_slateId,
            workedExample : false   
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.swapElement(dataObj,()=>{})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- SWAP ELEMENT ------action - catch', () => {
        //let store = mockStore(() => initialState);
        const typee = "element-authoredtext";
        const index = 2;

        let swappedElementData = {
            id : "urn:pearson:work:8a3e6ed2-e67b-4222-bf20-da5fddcaf929",
            contentUrn : "urn:pearson:entity:a4ecf47d-44b5-4555-acf3-e9445c6d2fd1"
        }

        let _requestData = {
            "projectUrn": "urn:pearson:distributable:6548a93a-9ca4-4955-b22b-49a5dff9b40f",
            "currentSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "destSlateEntityUrn":"urn:pearson:entity:c8d3d2b2-176c-48fc-8383-33444fe335f5",
            "workUrn":swappedElementData.id,
            "entityUrn":swappedElementData.contentUrn,
            "type": typee,
            "index": index
        }

        let dataObj = {
            oldIndex : 1,
            newIndex : 2,
            swappedElementData : swappedElementData,
            // slateId:_slateId,
            workedExample : false   
        }


        const expectedActions = {
            type: SWAP_ELEMENT
        };
        axios.post = jest.fn(() => Promise.reject({}))

        return store.dispatch(actions.swapElement(dataObj,()=>{})).catch(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe(expectedActions.type);

        });
    });
    it('testing------- setSplittedElementIndex ------action', () => {
        store.dispatch(actions.setSplittedElementIndex(1))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SPLIT_INDEX);
        });
   
    it('testing------- handleSplitSlate ------action - then', () => {

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200
            });
        });

        return store.dispatch(actions.handleSplitSlate({contentUrn : '',entityUrn : ''})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('FETCH_SLATE_DATA');
        });
    });
    it('testing------- handleSplitSlate ------action - catch', () => {

        axios.put = jest.fn(() => Promise.reject({}))

        return store.dispatch(actions.handleSplitSlate({contentUrn : '',entityUrn : ''})).then(() => {
            const { type } = store.getActions()[0];
            expect(type).toBe('FETCH_SLATE_DATA');
        });
    });
    it('testing------- setElementPageNumber ------action', () => {
        store.dispatch(actions.setElementPageNumber({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(GET_PAGE_NUMBER);
    });
    initialState.appStore.pageNumberData = {id : ""}
    it('testing------- setElementPageNumber with ID ------action', () => {
        store.dispatch(actions.setElementPageNumber({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(GET_PAGE_NUMBER);

    });
    it('testing------- setUpdatedSlateTitle ------action', () => {
        store.dispatch(actions.setUpdatedSlateTitle({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_UPDATED_SLATE_TITLE);
    });
    it('testing------- setSlateType  ------action', () => {
        store.dispatch(actions.setSlateType ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_TYPE);
    });
    it('testing------- setSlateEntity  ------action', () => {
        store.dispatch(actions.setSlateEntity ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_SLATE_ENTITY);
    });
    it('testing------- accessDenied  ------action', () => {
        store.dispatch(actions.accessDenied ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(ACCESS_DENIED_POPUP);
    });
    it('testing------- setSlateParent  ------action', () => {
        store.dispatch(actions.setSlateParent ({}))
        const { type } = store.getActions()[0];
        expect(type).toBe(SET_PARENT_NODE);
    });
    it('updatePageNumber ----else',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId,elementAside,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----else-catch',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.reject({}));
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: createstoreWithFigure.slateLevelData,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_FAIL'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec';
        let pagenumber = 0;
        actions.updatePageNumber(pagenumber, elementId,elementAside,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType1,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if-if',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData1,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType2,parentUrn)(dispatch,getState);
    })
    it('updatePageNumber ----if-else',() => {
        jest.mock('axios');
        axios.put = jest.fn(() => Promise.resolve({}));
        axios.delete= jest.fn(() => Promise.resolve({}));
        
        let getState = () => {
            return {
                appStore : {
                    slateLevelData: slateLevelData2,
                    // elementsTag: {},
                    activeElement: {},
                    splittedElementIndex: 0,
                    pageNumberData: {}
                }
            }
        }
        let dispatch = (obj) => {
            if(obj.type == 'UPDATE_PAGENUMBER_SUCCESS'){
                expect(obj.payload.pageLoading).toEqual(false)
            }
        };
        let parentUrn= {
            manifestUrn:"urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7"
        }
        let elementId = 'urn:pearson:work:1786a007-d28e-4d5e-8098-ac071e9c54b7';
        let pagenumber = 1;
        actions.updatePageNumber(pagenumber, elementId,asideDataType2,parentUrn)(dispatch,getState);
    })
    
});