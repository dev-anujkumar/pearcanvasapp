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
        jest.spyOn(document, 'getElementById').mockImplementation(() => {
            return { innerHTML: ""}
        });
        wrapper.find('div.markedindex-secondlevel-label').simulate('click');
    });
})
describe('Testing Markedindex cross-reference component with props', () => {
    let props={
        crossRefValue: [1,2]
    }
    let wrapper = mount(<Provider store={store}><CrossReference {...props} /></Provider>);
    it('Test Focus on para', () => {
        jest.setTimeout(200);
        jest.spyOn(document, 'getElementById').mockImplementation(() => {
            return {click: jest.fn(),
               innerHTML: '<br data-mce-bogus="1"> <br data-mce-bogus="1"> <br data-mce-bogus="1">'
            }
        });
        wrapper.find('#cross-ref').at(0).simulate('click');
    });
    });


