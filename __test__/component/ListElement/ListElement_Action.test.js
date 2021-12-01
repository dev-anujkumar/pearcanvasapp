import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
import axios from 'axios';
const mockStore = configureMockStore(middlewares);
import slateData from '../../../fixtures/SidebarTestData'
import * as listAction from '../../../src/component/ListElement/ListElement_Action.js';
jest.mock('axios');

jest.mock('../../../src/config/config.js', () => ({
    slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
}))

const initialState = {
    appStore: {
        slateLevelData: slateData.SlateData1,
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "UL",
            primaryOption: "primary-list",
            secondaryOption: "secondary-list-1",
            index: 1
        },
        asideData: {
            element: {
                type: 'manifestlist',
                index: '0-0-0-1',
                contentUrn: 'urn:pearson:work:8a49e877-144a-4750-92d2-f1u5c8kd8e1a'
            }
        }
    }
}
describe('Test convertElement- PARAGRAPH to LIST', () => {
    it('Test convertElement  -PARAGRAPH to LIST', () => {
        let store = mockStore(() => initialState);
        const spyconvertToListElement = jest.spyOn(listAction, 'convertToListElement')
        store.dispatch(listAction.convertToListElement('disc',1));
        expect(spyconvertToListElement).toHaveBeenCalled()
        spyconvertToListElement.mockClear()
    });
});
