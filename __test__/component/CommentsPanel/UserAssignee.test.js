import React from 'react';
import { mount, shallow } from 'enzyme';
import UserAssignee from '../../../src/component/CommentsPanel/UserAssignee';
import { comment, filters,users } from '../../../fixtures/commentPanelData.js'
let props ={ 
    comment:comment,
    mode:'assign',
    users:users
}
describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(< UserAssignee {...props} />)
  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('should have comment-wrapper', () => {
      expect(wrapper.find(".assignee-content")).toHaveLength(1)
    })
    it('should have comment-wrapper', () => {
        expect(wrapper.find("CurrentProjectUsers")).toHaveLength(1)
      })

  })

  })