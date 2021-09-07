import { shallow, mount } from 'enzyme';
import React from 'react';
import { users } from '../../../fixtures/commentPanelData';
import CommentMention from "../../../src/component/CommentMention/CommentMention"

describe('Renders Properly', () => {
    it('Renders Properly', () => {

        const wrapper = mount(<CommentMention isAddComment={false} projectUsers = {users} />);
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {

        })
    })
    it('Renders Properly', () => {

        const wrapper = mount(<CommentMention isAddComment={true} projectUsers = {users} />);
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {

        })
    })
})