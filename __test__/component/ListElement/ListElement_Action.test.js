import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
const middlewares = [thunk];
import axios from 'axios';
const mockStore = configureMockStore(middlewares);
import slateData from '../../../fixtures/SidebarTestData'
import * as listAction from '../../../src/component/ListElement/ListElement_Action.js';
jest.mock('axios');
const initialState = {
    appStore: {
        slateLevelData: slateData,
        activeElement: {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "UL",
            primaryOption: "primary-list",
            secondaryOption: "secondary-list-1",
        }
    }
}
xdescribe('Test convertElement- PARAGRAPH to LIST', () => {
    let store = mockStore(() => initialState);
    it('Test convertElement  -PARAGRAPH to LIST', () => {
        store = mockStore(() => initialState);
        let elementData = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1a",
            elementType: "element-authoredtext",
            labelText: "UL",
            primaryOption: "primary-list",
            secondaryOption: "secondary-list-1",
        }
        let store = mockStore(() => initialState);
        const spyconvertToListElement = jest.spyOn(listAction, 'convertToListElement')
        store.dispatch(listAction.convertToListElement('disc',true));
        expect(spyconvertToListElement).toHaveBeenCalled()
        spyconvertToListElement.mockClear()
    });
});
