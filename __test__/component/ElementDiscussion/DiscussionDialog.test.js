import React from 'react'
import DiscussionDialog from '../../../src/component/ElementDiscussion/DiscussionDialog'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

jest.mock('./../../../src/component/CanvasWrapper/CanvasWrapper_Actions', () => {
    return { 
      getLOBDiscussionItems: ()=>{
          return jest.fn()
      },
      resetLOBDiscussionItems: ()=>{
          return jest.fn()
      },
  }
  })

const mockStore = configureMockStore();
let initialState = {
    projectInfo: {
        LOB: 'OEP',
        usageType: [{ label: 'self reflection' }],
        discussionItems: [{ discussionUrn: '', title: "" }],
        showDiscussionLOBDropdown: true,
        LOBList: [{lineOfBusiness: "lineOfBusiness",label:"label"}]
    }
};
let initialState2 = {
    projectInfo: {
        LOB: 'OEP',
        usageType: [{ label: 'self reflection' }],
        discussionItems: [{ discussionUrn: '', title: "" }],
        showDiscussionLOBDropdown: false,
        LOBList: [{lineOfBusiness: "lineOfBusiness",label:"label"}]
    }
};
let store = mockStore(initialState);
let store2 = mockStore(initialState2);

describe('1. DiscussionDialog test cases with showDiscussionLOBDropdown = true ', () => {
    let props = {
        resetLOBDiscussionItems: jest.fn(),
        showDialog: true
    }
    const DiscussionDialogInstance = mount(
        <Provider store={store}>
            <DiscussionDialog {...props} />
        </Provider>
    );
    it("Testing onClick", () => {
        DiscussionDialogInstance.find('.cancelDiscussion').at(0).simulate('click');
        DiscussionDialogInstance.find('.notSelectDiscussion').at(0).simulate('click');
        DiscussionDialogInstance.find('.closeIconDiscussion').at(0).simulate('click');
    })
    xit("Testing onChange", () => {
        DiscussionDialogInstance.find('.searchTextDiscussion').at(0).simulate('change');
        DiscussionDialogInstance.find('.radioInDiscussion').at(0).simulate('change');
        DiscussionDialogInstance.find('.selectInDropdown').at(0).simulate('change',{target: {value: "test"}});
    })
});

describe('1. DiscussionDialog test cases with showDiscussionLOBDropdown = false ', () => {
    let props = {
        resetLOBDiscussionItems: jest.fn(),
    }
    const DiscussionDialogInstance = mount(
        <Provider store={store2}>
            <DiscussionDialog {...props} />
        </Provider>
    );
    it("Testing onClick", () => {
        DiscussionDialogInstance.find('.cancelDiscussion').at(0).simulate('click');
        DiscussionDialogInstance.find('.notSelectDiscussion').at(0).simulate('click');
        DiscussionDialogInstance.find('.closeIconDiscussion').at(0).simulate('click');
    })
    it("Testing onChange", () => {
        DiscussionDialogInstance.find('.searchTextDiscussion').at(0).simulate('change');
        DiscussionDialogInstance.find('.radioInDiscussion').at(0).simulate('change');
    })
});