import React from 'react'
import DialogueSaprator from '../../../src/component/ElementDialogue/DialogueSeprator'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as utils from '../../../src/constants/utility';

const mockStore = configureMockStore();
let initialState = {}
let store = mockStore(initialState);

describe('1. DialogueSaprator test cases with firstOne ', () => {
    jest.spyOn(utils, 'hasReviewerRole').mockReturnValueOnce(true);
    let props = {
        addElement: jest.fn(),
        firstOne: "test"
    }
    const DialogueSapratorInstance = mount(
        <Provider store={store}>
            <DialogueSaprator {...props} />
        </Provider>
    );
    it("Testing onClick", () => {
        DialogueSapratorInstance.find('.dropbtn').at(0).simulate('click');
        DialogueSapratorInstance.find('.dropbtn').at(1).simulate('click');
    })
});

describe('2. DialogueSaprator test cases without firstOne ', () => {
    let props = {
        addElement: jest.fn(),
    }
    const DialogueSapratorInstance = mount(
        <Provider store={store}>
            <DialogueSaprator {...props} />
        </Provider>
    );
    it("Testing onClick", () => {
        DialogueSapratorInstance.find('.dropbtn').at(0).simulate('click');
        DialogueSapratorInstance.find('.dropbtn').at(1).simulate('click');
    })
});