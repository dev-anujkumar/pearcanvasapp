import React from 'react';
import { mount, shallow } from 'enzyme';
import ReplyComment from '../../../src/component/CommentsPanel/ReplyComment';
import { comment, commentWithReply } from '../../../fixtures/commentPanelData.js'
import { spy, stub } from 'sinon';
import config from '../../../src/config/config';
describe('Testing CommentsPanel component with props', () => {
    const updateReplyComment = new stub();
    let props = {
        showReplyForm: true,
        toggleReplyForm: true,
        comment: commentWithReply
    }
    let wrapper = mount(< ReplyComment
        updateReplyComment={updateReplyComment}
        {...props} />)
    const instance = wrapper.instance();
    
    xit('tests the function  replyCommentForm with if condition', () => {
        let replyForm = instance.replyCommentForm(props);
        expect(replyForm.props.className).toEqual('reply');
    })
    it('tests the function replyCommentForm with else condition', () => {
        let props = {
            showReplyForm: false,
            toggleReplyForm: false,
            comment: commentWithReply
        }
        instance.replyCommentForm(props);
    })

    it('tests the function  replyComment with if condition', () => {
        config.userId = "c5test01";
        process.env = {
            NODE_ENV: "development"
        }
        instance.replyComment(props);
    })

    it('tests the function  updateComment with if condition', () => {
        let event = {
            target: {
                value: "test"
            }
        }
        instance.updateCommentText(event);
        const text = wrapper.state().text;
        expect(text).toEqual("test");
    })


})