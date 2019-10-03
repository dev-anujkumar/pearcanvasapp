import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { storeMock,storeWithFigure,slateLevelData, createFigureElementDefault,defaultSlateData,defaultSlateDataFigure } from "../../../fixtures/slateTestingData"
import { FIGURE_ELEMENT_CREATED, SWAP_ELEMENT } from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Tests Slate Wrapper Actions', () => {
    let store = mockStore(() => initialState);
    let initialState = {
        appStore: storeMock.slateLevelData
    };
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => moxios.uninstall());

    it('testing------- ADD FIGURE ------action', () => {
        store = mockStore(() => initialState);
        const typee = "IMAGE";
        const index = 3;
        const _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": typee,
            "index": index
        };
        const axiosPayload = storeWithFigure.slateLevelData;

        const expectedActions = [{
            type: FIGURE_ELEMENT_CREATED,
            payload: { axiosPayload }

        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: ""
            });
        });

        return store.dispatch(actions.createFigureElement(typee, index)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(FIGURE_ELEMENT_CREATED);


        });
    });

    it('testing------- SWAP ELEMENT ------action', () => {
        store = mockStore(() => initialState);
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

        function cb () {
            console.log('cb called!!')
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

        return store.dispatch(actions.swapElement(dataObj)).then(() => {
            // const { type } = store.getActions();
            // expect(type).toBe(SWAP_ELEMENT);
            expect(store.getActions().type).toEqual(expectedActions.type)

        });
    });

});