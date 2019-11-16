import React from 'react';
import { mount, shallow } from 'enzyme';
import ElementMetaDataAnchor from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
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
    permissions:['lo_edit_metadata'],
    currentSlateLOData:{
        "lourn": "urn:5567809876",
        "label": { en: "test data" }
    }
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

        //wrapper.find('.learningObjectiveContainer').simulate('click');
        elementMetaAnchorInstance.onLOClickHandle(props.currentSlateLOData)
        expect(elementMetaAnchorInstance.props.currentSlateLOData).toEqual(data);
    })

});