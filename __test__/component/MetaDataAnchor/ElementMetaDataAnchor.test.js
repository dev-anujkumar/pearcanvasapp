import React from 'react';
import { mount } from 'enzyme';
import ElementMetaDataAnchor from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    metadataReducer: {
        currentSlateLOData: {
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        }
    }
});
let props = {
    slateLockInfo: {
        isLocked: false
    },
    permissions: ['lo_edit_metadata'],
    currentSlateLOData: {
        "lourn": "urn:5567809876",
        "label": { en: "test data" }
    },
    model: { text: "<p>Meatada</p>" },
    handleFocus: jest.fn(),
    showBlocker: jest.fn()
}
let wrapper = mount(<Provider store={store}><ElementMetaDataAnchor  {...props} /> </Provider>)
let elementMetaAnchorInstance = wrapper.find('ElementMetaDataAnchor').instance();

//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {

    it('render component', () => {
        expect(wrapper.find('ElementMetaDataAnchor')).toHaveLength(1);
    })
    it('on lo click', () => {
        let data =
        {
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        }
        let event = { target: { id: "aefeqrwq" }, stopPropagation: jest.fn() }
        elementMetaAnchorInstance.onLOClickHandle(props.currentSlateLOData, event)
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })
    it('on call of prepareLOData',()=>{
        let loData={
            "lourn": "urn:5567809876",
            "label": { en: "test data" }
        };
        let div = document.createElement('div');
        div.setAttribute('class','learningObjectiveinnerText');
        document.body.appendChild(div);
        elementMetaAnchorInstance.prepareLOData(loData);
    })

});