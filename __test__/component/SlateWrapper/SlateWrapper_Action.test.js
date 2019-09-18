import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actions from '../../../src/component/SlateWrapper/SlateWrapper_Actions';
import { slateLevelData, createFigureElementDefault } from "../../../fixtures/slateTestingData"
import { FIGURE_ELEMENT_CREATED } from '../../../src/constants/Action_Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = { slateLevelData };


xdescribe('Tests Slate Wrapper Actions', () => {
    let initialState = {
        slateLevelData: slateLevelData,
        appStore: slateLevelData
    };
    let store = mockStore(() => initialState);

    beforeEach(() => {

        moxios.install();
    });

    afterEach(() => moxios.uninstall());
    it('testing------- ADD FIGURE ------action', () => {
        var eleFigure = {
            "type": "figure",
            "figuretype": "image",
            "subtype": "image50Text",
            "alignment": "half-text",
        }
        var index = 3;
        let _requestData = {
            "projectUrn": "urn:pearson:distributable:553615b2-57c9-4508-93a9-17c6909d5b44",
            "slateEntityUrn": "urn:pearson:entity:920e1d14-236e-4882-9a7c-d9d067795d75",
            "slateUrn": "urn:pearson:manifest:b94059f3-4592-4d84-a316-18d4ba05d734",
            "type": eleFigure.type,
            "figuretype": eleFigure.figuretype,
            "subtype": eleFigure.subtype,
            "alignment": eleFigure.alignment,
            "index": index
        };
        const expectedActions = [{
            type: FIGURE_ELEMENT_CREATED,
            payload: createFigureElementDefault
        }];
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: _requestData
            });
        });
        console.log("store.getActions()", store.getState())
        return store.dispatch(actions.createFigureElement(eleFigure, index)).then(() => {
            const { type, payload } = store.getActions()[0];
            expect(type).toBe(FIGURE_ELEMENT_CREATED);
        });
    })

});