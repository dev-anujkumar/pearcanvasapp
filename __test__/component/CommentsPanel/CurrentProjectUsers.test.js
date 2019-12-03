import React from 'react';
import { mount } from 'enzyme';
import CurrentProjectUser from '../../../src/component/CommentsPanel/CurrentProjectUsers';
import { users } from '../../../fixtures/commentPanelData.js'

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
        instance.getUser('c5test',event);
        expect(wrapper.find("ul.assign-user-list-popup-container")).toHaveLength(1);
    })
    it('simulating click function on li',() =>{
    const instance = wrapper.instance()
    const spy = jest.spyOn(instance, 'getUser');
    let event = {target:{className:'assign-user-list-items asignee-selected'}};
    wrapper.find("li.assign-user-list-items").at(0).simulate('click',event);
    expect(spy).toHaveBeenCalledTimes(1)
    })

  })

  })