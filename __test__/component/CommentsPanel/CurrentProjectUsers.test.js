import React from 'react';
import { mount, shallow } from 'enzyme';
import CurrentProjectUser from '../../../src/component/CommentsPanel/CurrentProjectUsers';
import { comment, filters,users } from '../../../fixtures/commentPanelData.js'

describe('Testing CommentsPanel component with props', () => {
    let props = {
        currentAssingnee:"c5Test01",
        newAssigneeUser:function newAssigneeUser () {},
       users:users
    }
  let wrapper = mount(< CurrentProjectUser {...props} />)
  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('test get User function', () => {
        let event = {target:{className:'assign-user-list-items asignee-selected'}}
        instance.getUser('c5test',event)
      //expect(wrapper.find(".assignee-content")).toHaveLength(1)
    })

  })

  })