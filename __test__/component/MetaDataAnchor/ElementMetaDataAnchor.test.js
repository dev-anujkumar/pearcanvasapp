import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import ElementMetaDataAnchor from '../../../src/component/ElementMetaDataAnchor/ElementMetaDataAnchor';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    metadataReducer:{
        currentSlateLOData:{}
    }
});
let props={
    slateLockInfo:{
        isLocked:false
    }
}
    let wrapper = mount(<Provider store={store}><ElementMetaDataAnchor  {...props}/> </Provider>)
    let elementMetaAnchorInstance = wrapper.find('ElementMetaDataAnchor').instance();

//Rendering component
describe('Test Rendering of metadaanchor on slate', () => {
   
    it('render component', () => {
        expect(wrapper.find('ElementMetaDataAnchor')).toHaveLength(1);
    })
    it('onClick', () => {
        elementMetaAnchorInstance.onClick();
    })
    it('onBlur', () => {
        elementMetaAnchorInstance.onBlur();
    })
    it('onKeyup', () => {
        elementMetaAnchorInstance.onKeyup();
    })

    it('onFocus', () => {
        elementMetaAnchorInstance.onFocus();
    })
});