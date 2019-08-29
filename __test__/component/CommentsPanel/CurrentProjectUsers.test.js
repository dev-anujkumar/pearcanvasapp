import React from 'react';
import { mount, shallow } from 'enzyme';
import CurrentProjectUser from '../../../src/component/CommentsPanel/CurrentProjectUsers';
import { comment, filters } from '../../../fixtures/commentPanelData.js'

describe('Testing CommentsPanel component with props', () => {
    let props = {
        currentAssingnee:"c5Test01",
        newAssigneeUser:'c5Test02'
    }
  let wrapper = mount(< CurrentProjectUser {...props} />)
  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('test get User function', () => {
        let event = {target:{className:'assign-user-list-items asignee-selected'}}
        instance.getUser('c5test',event)
      //expect(wrapper.find(".assignee-content")).toHaveLength(1)
    })
    it('test refresh User function', () => {
        let urn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c"
        instance.refreshUsers(urn)
      //expect(wrapper.find(".assignee-content")).toHaveLength(1)
    })

  })

  })