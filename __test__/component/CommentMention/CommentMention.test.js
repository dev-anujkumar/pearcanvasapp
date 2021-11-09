import { shallow, mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { users } from '../../../fixtures/commentPanelData';
import CommentMention from "../../../src/component/CommentMention/CommentMention"

const store = createStore(() => ({}))

describe('Renders Properly', () => {
    it('Renders Properly', () => {

        const wrapper = mount(<Provider store={store}>
            <CommentMention isAddComment={false} projectUsers = {users} />
        </Provider>
        );
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {

        })
    })
    it('Renders Properly', () => {

        const wrapper = mount(
        <Provider store={store}>
<CommentMention isAddComment={true} projectUsers = {users} />
        </Provider>)
        const textArea = wrapper.find(".comment-mentions").childAt(0);
        textArea.simulate('change', () => {

        })
    })
})