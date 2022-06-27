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

    it('Checking return null condition : ', () => {
        let props2={
            selectedData: ['cross'],
            dropDownList: [],
            handleSelectedCheckboxValue: jest.fn()
        }
        let wrapper2 = mount(<Provider store={store}><CrossRefCheckbox {...props2} /></Provider>);
        expect(wrapper2).toHaveLength(1);
    })

});
