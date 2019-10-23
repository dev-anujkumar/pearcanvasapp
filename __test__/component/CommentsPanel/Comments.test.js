import React from 'react';
import { mount, shallow } from 'enzyme';
import Comments from '../../../src/component/CommentsPanel/Comments';
import { comment, filters, users ,permissions} from '../../../fixtures/commentPanelData.js'
import { spy, stub } from 'sinon';

describe('Testing CommentsPanel component with props', () => {
  const updateElementComment = new stub();
  const updateAssignee = new stub();
  const updateResolveComment = new stub();
  const toggleReply = new stub();
  const getProjectUsers = new stub();
  const deleteComment = new stub();
  let props = {
    users: users,
    permissions: permissions
  }
  let wrapper = mount(< Comments
    updateElementComment={updateElementComment}
    updateAssignee={updateAssignee}
    updateResolveComment={updateResolveComment}
    toggleReply={toggleReply}
    getProjectUsers={getProjectUsers}
    deleteComment={deleteComment}
    comment={comment}
    {...props}
  />)

  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('should have comment-wrapper', () => {
      expect(wrapper.find(".comment-wrapper")).toHaveLength(1)
    }),

      it('Should have  action  menu', () => {
        expect(wrapper.find('.action-menu-btn')).toHaveLength(1)
      }),

      it('Should have  comment body', () => {
        expect(wrapper.find('.comment-body')).toHaveLength(1)
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
      let actionMenu = instance.actionsMenu();
      expect(actionMenu.props.className).toEqual('comment-action-menu action-menu');
      expect(actionMenu.props.children).toHaveLength(5); 
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

  describe('test toggle reply function', () => {
    it('test toggle reply form with true ', () => {

      instance.toggleReplyForm(true)
      const showReplyForm = wrapper.state().showReplyForm;
      expect(showReplyForm).toEqual(true);
    });

    it('test toggle reply form with false', () => {
      instance.toggleReplyForm(false)
      const showReplyForm = wrapper.state().showReplyForm;
      expect(showReplyForm).toEqual(false);

    });

    it('test toggle reply form with undefiend', () => {
      instance.toggleReplyForm(undefined)
      const showReplyForm = wrapper.state().showReplyForm;
      expect(showReplyForm).toEqual(showReplyForm);

    });
  })

  describe('test function of comment', () => {
    it('test  change assignee with true ', () => {
      instance.changeAssignee(true)
      const isSelectAssignee = wrapper.state().isSelectAssignee;
      expect(isSelectAssignee).toEqual(false);

    });

    it('test new assignee function with value ', () => {
      instance.newAssigneeUser("test")
      const newAssignee = wrapper.state().newAssignee;
      const isSelectAssignee = wrapper.state().isSelectAssignee
      expect(isSelectAssignee).toEqual(true);
      expect(newAssignee).toEqual("test");

    });

    it('test update comment test function ', () => {
      instance.newAssigneeUser("test")
      const newAssignee = wrapper.state().newAssignee;
      const isSelectAssignee = wrapper.state().isSelectAssignee
      expect(isSelectAssignee).toEqual(true);
      expect(newAssignee).toEqual("test");

    });
    it('test update comment test function ', () => {
      let event = {
        target: {
          value: "test"
        }
      }
      instance.updateCommentText(event)
      const updatedFields = wrapper.state().updatedFields.text;
      expect(updatedFields).toEqual("test");
    });

    it('test delete comment  function ', () => {
      instance.deleteComment()
    });
    it('test toggle action menu function with true',() => {
      instance.toggleActionsMenu(true);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(true);
    })
    it('test toggle action menu function with false',() => {
      instance.toggleActionsMenu(false);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(false);
    })
    it('test toggle action menu function with undefiend',() => {
      instance.toggleActionsMenu(undefined);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(true);
    })
  })

  describe('test click events',()=>{
    it('test toggle action meny click event',() =>{
      const spy = jest.spyOn(instance, 'toggleActionsMenu');
      wrapper.find('.action-menu-btn').simulate('click')
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })


})

