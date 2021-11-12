import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Component from '../../../src/component/MarkIndexPopup/MarkIndex_CrossReference.js';

let {CrossReference} = Component;
const mockStore = configureMockStore();

const initialState ={
    markedIndexReducer: {
        crossReferenceValues: []
    }
}
let store = mockStore(initialState);

describe('Testing Markedindex cross-reference component with props', () => {
    let props={
        crossRefValue: []
    }
    let wrapper = mount(<Provider store={store}><CrossReference {...props} /></Provider>);

    it('should render Markedindex component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should test change popUpStatus', () => {
        wrapper.find('div.markedindex-secondlevel-label').simulate('click');
    });

})
