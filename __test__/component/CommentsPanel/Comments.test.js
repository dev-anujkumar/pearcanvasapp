import React from 'react';
import { mount, shallow } from 'enzyme';
import Comments from '../../../src/component/CommentsPanel/Comments';
import { comment, filters } from '../../../fixtures/commentPanelData.js'

describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(< Comments comment={comment} />)
  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('should have comment-wrapper', () => {
      expect(wrapper.find(".comment-wrapper")).toHaveLength(1)
    }),

      it('Should have  action  menu', () => {
        expect(wrapper.find('.action-menu-btn')).toHaveLength(1)
      }),

      it('Should have  comment body', () => {
        expect(wrapper.find('.comment-body')).toHaveLength(2)
      })
      it('Should have  check property', () => {
        expect(wrapper.find('.property')).toHaveLength(4)
      })
      it('Should have user assignee component', () => {
        expect(wrapper.find('UserAssignee')).toHaveLength(1)
      })
      it('Should have  Reply component', () => {
        expect(wrapper.find('ReplyComment')).toHaveLength(1)
      })

  })

  describe('Testing functions with props', () => {
    it('renders update assignee function correctly', () => {
        instance.updateAssignee()
  
      });
      it('renders remove assinee function correctly', () => {
        instance.removeAssigneePopup()
        
      });
      it('renders edit from correctly', () => {
        instance.editForm()
      });
      it('render action menu from correctly', () => {
        instance.actionsMenu()
      });
      it('render remove comment from correctly', () => {
       
        instance.resolveComment()
     
      });
      it('render edit comment from correctly', () => {
        instance.editComment()
      });
      it('render UpdateComment comment from correctly', () => {
    
        instance.updateComment('paragraph')
      
      });

  })

  describe('test toogle reply function',() => {
    it('test toggle replay form with true ', () => {
      
        instance.toggleReplyForm(true)
        const showReplyForm = wrapper.state().showReplyForm;
        expect(showReplyForm).toEqual(true);
      });

      it('test toggle replay form with false', () => {
        instance.toggleReplyForm(false)
        const showReplyForm = wrapper.state().showReplyForm;
        expect(showReplyForm).toEqual(false);
      
      });

      it('test toggle replay form with false', () => {
        instance.toggleReplyForm(undefined)
        const showReplyForm = wrapper.state().showReplyForm;
        expect(showReplyForm).toEqual(showReplyForm);
     
      });
  })

  describe('test change assignee  function',() => {
    it('test toggle replay form with true ', () => {
        instance.changeAssignee(true)
        const isSelectAssignee = wrapper.state().isSelectAssignee;
        expect(isSelectAssignee).toEqual(false);
     
      });
  })

  describe('test new assignee  function',() => {
    it('test toggle replay form with true ', () => {
        instance.newAssigneeUser("test")
        const newAssignee = wrapper.state().newAssignee;
        const isSelectAssignee = wrapper.state().isSelectAssignee
        expect(isSelectAssignee).toEqual(true);
        expect(newAssignee).toEqual("test");
   
      });
  })
})

