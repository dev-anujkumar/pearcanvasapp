import React from 'react';
import { mount } from 'enzyme';
import UserAssignee from '../../../src/component/CommentsPanel/UserAssignee';
import { comment,users } from '../../../fixtures/commentPanelData.js';
let props ={ 
    comment:comment,
    mode:'assign',
    users:users,
    show:true,
    newAssigneeUser:jest.fn(),
    setMode:jest.fn(),
    updateAssignee:jest.fn(),
    isSelectAssignee:true
}
describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(< UserAssignee {...props} />);
  describe('Testing rendering component with props', () => {
    it('simulating click for alf-cms-1 li',() => {
      wrapper.find('.set-assignee-button').simulate('click');
      expect(wrapper.find('CurrentProjectUsers')).toHaveLength(1);
    })
    it('should have comment-wrapper', () => {
        expect(wrapper.find("CurrentProjectUsers")).toHaveLength(1)
    })
    it('For else part', () => {
      wrapper.setProps({show:false})
      expect(wrapper.find('UserAssignee')).toHaveLength(1);
    })
  })
})