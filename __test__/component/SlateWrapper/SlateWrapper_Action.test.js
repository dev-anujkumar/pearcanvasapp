import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { storeMock,storeWithFigure,slateLevelData, createFigureElementDefault,defaultSlateData,defaultSlateDataFigure } from "../../../fixtures/slateTestingData"
import { AUTHORING_ELEMENT_CREATED } from '../../../src/constants/Action_Constants';

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
            type: AUTHORING_ELEMENT_CREATED,
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

});