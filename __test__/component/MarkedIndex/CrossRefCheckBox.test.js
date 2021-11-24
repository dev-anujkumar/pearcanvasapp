import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import * as Component from '../../../src/component/MarkIndexPopup/CrossRefCheckBox';

let {CrossRefCheckbox} = Component;
const mockStore = configureMockStore();

const initialState ={
    markedIndexReducer: {
        crossReferenceValues: []
    }
}
let store = mockStore(initialState);

describe('Testing Markedindex cross-reference component with props', () => {
    let props={
        selectedData: ['cross'],
        dropDownList: ['cross'],
        handleSelectedCheckboxValue: jest.fn()
    }
    let wrapper = mount(<Provider store={store}><CrossRefCheckbox {...props} /></Provider>);

    it('render CrossRefCheckBox component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('Should test trigger change component', () => {
        wrapper.find('div.checkbox-input input[name="cross"]').simulate('change');
    });

});
