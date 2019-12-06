import React from 'react';
import { mount } from 'enzyme';
import UserAssignee from '../../../src/component/CommentsPanel/UserAssignee';
import { comment,users } from '../../../fixtures/commentPanelData.js';
let props ={ 
    comment:comment,
    mode:'assign',
    users:users,
    newAssigneeUser:jest.fn(),
    setMode:jest.fn(),
    updateAssignee:jest.fn()
}
describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(< UserAssignee {...props} />);
  describe('Testing rendering component with props', () => {
    it('simulating click for alf-cms-1 li',() => {
      wrapper.find('.set-assignee-button').simulate('click');
      expect(wrapper.find('CurrentProjectUsers')).toHaveLength(1);
      expect(wrapper.find('.property-title').text()).toEqual('Assignee');
    })
    it('should have comment-wrapper', () => {
      expect(wrapper.find(".assignee-content")).toHaveLength(1)
    })
    it('should have comment-wrapper', () => {
        expect(wrapper.find("CurrentProjectUsers")).toHaveLength(1)
      })

  })

  })