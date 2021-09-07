import React from 'react';
import { mount, shallow } from 'enzyme';
import ReplyComment from '../../../src/component/CommentsPanel/ReplyComment';
import { comment, commentWithReply } from '../../../fixtures/commentPanelData.js'
import { spy, stub } from 'sinon';
import config from '../../../src/config/config';
describe('Testing CommentsPanel component with props', () => {
    const updateReplyComment = new stub();
    let props = {
        showReplyComments: true,
        showReplyForm: true,
        toggleReplyForm: true,
        comment: commentWithReply,
        close: jest.fn()
    }

    let wrapper = shallow(< ReplyComment
        updateReplyComment={updateReplyComment}
        {...props} />)
    const instance = wrapper.instance();
    
    xit('tests the function  replyCommentForm with if condition', () => {
        let replyForm = instance.replyCommentForm(props);
        expect(wrapper.find(".reply").first()).toHaveLength(2);

    })
    it('tests the function replyCommentForm with else condition', () => {
        let props = {
            showReplyForm: false,
            toggleReplyForm: false,
            comment: commentWithReply
        }
        wrapper.setProps(props);
        instance.replyCommentForm(props);
        expect(wrapper.find(".reply")).toHaveLength(2);
    })

    it('tests the function  replyComment with if condition', () => {
        config.userId = "c5test01";
        process.env = {
            NODE_ENV: "development"
        }
        instance.replyComment(props);
        const text = wrapper.state().text;
        expect(text).toEqual("");
    })

    it('tests the function  updateComment with if condition', () => {
        let event = "test"
        instance.updateCommentText(event);
        const text = instance.state.text;
        expect(text).toEqual("test");
    })


})