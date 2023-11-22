import React from 'react';
import { mount } from 'enzyme';
import CurrentProjectUser from '../../../src/component/CommentsPanel/CurrentProjectUsers';
import { users } from '../../../fixtures/commentPanelData.js'

describe('Testing CommentsPanel component with props', () => {
  let new_props = {
    currentAssingnee: "test09,abc",
    newAssigneeUser: function newAssigneeUser() { },
    users: users,
  }
  describe('Testing rendering component with props', () => {
    let props={...new_props,mode: "assign"}
    let wrapper = mount(< CurrentProjectUser {...props} />)
    const instance = wrapper.instance();
    it('test get User function', () => {
      let event = { target: { className: 'assign-user-list-items asignee-selected' } }
      instance.getUser('c5test', event);
      expect(wrapper.find("ul.assign-user-list-popup-container")).toHaveLength(1);
    })
    it('simulating click function on li', () => {
      const instance = wrapper.instance()
      const spy = jest.spyOn(instance, 'getUser');
      let event = { target: { className: 'assign-user-list-items asignee-selected' } };
      wrapper.find(".assign-user-list-items").at(0).simulate('click', event);
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe('Testing rendering component with props false condition', () => {
    let props={...new_props,mode: "assign",currentAssingnee:"Rahul"}
    let wrapper = mount(< CurrentProjectUser {...props} />)
    const instance = wrapper.instance();
    it('test get User function', () => {
      let event = { target: { className: 'assign-user-list-items asignee-selected' } }
      instance.getUser('c5test', event);
      expect(wrapper.find("ul.assign-user-list-popup-container")).toHaveLength(1);
    })
    it('simulating click function on li', () => {
      const instance = wrapper.instance()
      const spy = jest.spyOn(instance, 'getUser');
      let event = { target: { className: 'assign-user-list-items asignee-selected' } };
      wrapper.find(".assign-user-list-items").at(0).simulate('click', event);
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe('Testing rendering component with props without using mode', () => {
    let props ={...new_props}
    let wrapper = mount(< CurrentProjectUser {...props} />)
    const instance = wrapper.instance();
    it('test get User function', () => {
      let event = { target: { className: 'assign-user-list-items asignee-selected' } }
      instance.getUser('c5test', event);
      expect(wrapper.find("ul.assign-user-list-popup-container")).toHaveLength(1);
    })
    it('simulating click function on li', () => {
      const instance = wrapper.instance()
      const spy = jest.spyOn(instance, 'getUser');
      let event = { target: { className: 'assign-user-list-items asignee-selected' } };
      wrapper.find(".assign-user-list-items").at(0).simulate('click', event);
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
  describe('Testing rendering component with props without using mode with false condition', () => {
    let props ={...new_props, currentAssingnee: "Rahul"}
    let wrapper = mount(< CurrentProjectUser {...props} />)
    const instance = wrapper.instance();
    it('test get User function', () => {
      let event = { target: { className: 'assign-user-list-items asignee-selected' } }
      instance.getUser('c5test', event);
      expect(wrapper.find("ul.assign-user-list-popup-container")).toHaveLength(1);
    })
    it('simulating click function on li', () => {
      const instance = wrapper.instance()
      const spy = jest.spyOn(instance, 'getUser');
      let event = { target: { className: 'assign-user-list-items asignee-selected' } };
      wrapper.find(".assign-user-list-items").at(0).simulate('click', event);
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})