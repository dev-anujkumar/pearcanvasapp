import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];import { users } from '../../../fixtures/commentPanelData';
import CommentMention from "../../../src/component/CommentMention/CommentMention"

const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const props = {
    handleCommentChange: jest.fn(),
    isEditMode: "test",
}
const props1 = {
    readOnly : "",
    isEditMode: ""
}

describe('Renders Properly', () => {
    it('Renders Properly', () => {
        const wrapper = mount(<Provider store={store}>
            <CommentMention {...props} isAddComment={false} projectUsers={users} />
        </Provider>
        );
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {})
    })
    it('Renders Properly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props} isAddComment={true} projectUsers={users} />
            </Provider>)
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {})
    })
    it('Renders Properly', () => {
        const wrapper = mount(<Provider store={store}>
            <CommentMention {...props1} isAddComment={false} projectUsers={users} />
        </Provider>
        );
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {})
    })
    it('Renders Properly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props1} isAddComment={true} projectUsers={users} />
            </Provider>)
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {})
    })
    it('Testing onCommentChange : if', () => {
        const handleCommentChange = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props} handleCommentChange={handleCommentChange} readOnly={false} assignUser={true} isAddComment={true} isEditMode={true} projectUsers = {users} />
            </Provider>)
        const comment = "test";
        wrapper
        .find('MentionsInput')
        .props()
        .onChange({},comment);
    })
    it('Testing onCommentChange : else', () => {
        const handleCommentChange = jest.fn();
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props} handleCommentChange={handleCommentChange} readOnly={true} assignUser={true} isAddComment={true} isEditMode={true} projectUsers = {users} />
            </Provider>)
        const comment = "test";
        wrapper
        .find('MentionsInput')
        .props()
        .onChange({},comment);
    })
    it('Testing getUsers : if', () => {
        let projectUsers = []
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props} projectUsers = {projectUsers} />
            </Provider>)
            const comment = "test";
        wrapper
        .find('MentionsInput')
        .props()
        .onFocus({},comment);
    })
    it('Testing getUsers : else', () => {
        let projectUsers = ['test']
        const wrapper = mount(
            <Provider store={store}>
                <CommentMention {...props} projectUsers = {projectUsers} />
            </Provider>)
            const comment = "test";
        wrapper
        .find('MentionsInput')
        .props()
        .onFocus({},comment);
    })
})