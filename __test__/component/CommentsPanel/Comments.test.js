import React from 'react';
import { mount } from 'enzyme';
import Comments from '../../../src/component/CommentsPanel/Comments';
import { comment, users, permissions } from '../../../fixtures/commentPanelData.js'
import config from '../../../src/config/config';
import { stub } from 'sinon';

jest.mock('../../../src/component/CommentMention/CommentMention', () => () => (<div />))

describe('Testing CommentsPanel component with props', () => {
  const updateElementComment = new stub();
  const updateAssignee = new stub();
  const updateRole = new stub();
  const updateResolveComment = new stub();
  const toggleReply = new stub();
  const getProjectUsers = new stub();
  const deleteComment = new stub();
  let props = {
    users: users,
    permissions: permissions
  }
  let props1 ={
    users:[],
    permissions:[],
  }
  
  let wrapper = mount(
    <Comments
      updateElementComment={updateElementComment}
      updateAssignee={updateAssignee}
      updateRole={updateRole}
      updateResolveComment={updateResolveComment}
      toggleReply={toggleReply}
      getProjectUsers={getProjectUsers}
      deleteComment={deleteComment}
      comment={comment}
      {...props}
    />)

    let new_wrapper = mount(
      <Comments
        updateElementComment={updateElementComment}
        updateAssignee={updateAssignee}
        updateRole={updateRole}
        updateResolveComment={updateResolveComment}
        toggleReply={toggleReply}
        getProjectUsers={getProjectUsers}
        deleteComment={deleteComment}
        comment={comment}
        {...props1}
      />)

  const instance = wrapper.instance();
  const instance1 = new_wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('should have comment-wrapper', () => {
      instance.setState({showReplyComments : true})
      expect(wrapper.find(".comment-wrapper")).toHaveLength(1)
    }),

      it('Should have  action  menu', () => {
        expect(wrapper.find('.action-menu-btn')).toHaveLength(1)
      }),

      it('Should have  comment body', () => {
        expect(wrapper.find('.comment-body')).toHaveLength(1)
      })
    it('Should have  check property', () => {
      expect(wrapper.find('.property')).toHaveLength(6)
    })
    it('Should have user assignee component', () => {
      expect(wrapper.find('UserAssignee')).toHaveLength(2)
    })
    it('Should have  Reply component', () => {
      expect(wrapper.find('ReplyComment')).toHaveLength(1)
    })

  })

  describe('Testing functions with props', () => {
    it('renders update assignee function correctly', () => {
      const spy = jest.spyOn(instance, 'updateAssignee');
      instance.updateAssignee();
      expect(spy).toHaveBeenCalledTimes(1);

    });
    it('renders update role function correctly', () => {
      const spy = jest.spyOn(instance, 'updateRole');
      instance.updateRole();
      expect(spy).toHaveBeenCalledTimes(1);

    });
    it('renders remove assinee function correctly', () => {
      const spy = jest.spyOn(instance, 'setMode');
      instance.removeAssigneePopup();
      expect(spy).toHaveBeenCalledTimes(1);

    });
    it('renders remove role function correctly', () => {
      const spy = jest.spyOn(instance, 'setMode');
      instance.removeRolePopup();
      expect(spy).toHaveBeenCalledTimes(1);

    });
    it('renders edit from correctly', () => {
      let jsx = instance.editForm();
      expect(jsx.type).toEqual('div');

    });
    it('render action menu from correctly', () => {
      let actionMenu = instance.actionsMenu();
      expect(actionMenu.props.className).toEqual('comment-action-menu action-menu');
      expect(actionMenu.props.children).toHaveLength(5);
    });
    it('render action menu from correctly from same user', () => {
      config.userId ="c5test01"
      let actionMenu = instance.actionsMenu();
      expect(actionMenu.props.className).toEqual('comment-action-menu action-menu');
      expect(actionMenu.props.children).toHaveLength(5);
    });
    it('render action menu from correctly from same user', () => {
      config.userId ="test012"
      let actionMenu = instance.actionsMenu();
      expect(actionMenu.props.className).toEqual('comment-action-menu action-menu');
      expect(actionMenu.props.children).toHaveLength(5);
    });

    it('render action menu from correctly from same user', () => {
      config.userId ="test012"
      let actionMenu = instance1.actionsMenu();
      expect(actionMenu.props.className).toEqual('comment-action-menu action-menu');
      expect(actionMenu.props.children).toHaveLength(5);
    });

    it('render remove comment from correctly', () => {
      const spy = jest.spyOn(instance, 'toggleActionsMenu');
      instance.resolveComment();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('render edit comment from correctly', () => {
      const spy = jest.spyOn(instance, 'toggleActionsMenu');
      instance.editComment();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('render UpdateComment comment from correctly', () => {
      instance.updateComment('this is comment');
      expect(instance.state.updatedFields.text).toEqual('this is comment');
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
    it('test  change assignee with user length 0', () => {
      instance1.changeAssignee(true)
      const isSelectAssignee = new_wrapper.state().isSelectAssignee;
      expect(isSelectAssignee).toEqual(false);
    });

    it('test new assignee function with value ', () => {
      instance.newAssigneeUser("test")
      const newAssignee = wrapper.state().newAssignee;
      const isSelectAssignee = wrapper.state().isSelectAssignee
      expect(isSelectAssignee).toEqual(true);
      expect(newAssignee).toEqual("test");
    });

    it('test new role function with value ', () => {
      instance.newRoleUser("test")
      const newRole = wrapper.state().newRole;
      const isSelectRole = wrapper.state().isSelectRole
      expect(isSelectRole).toEqual(true);
      expect(newRole).toEqual("test");
    });

    it('test update comment test function ', () => {
      let event = "test"
      instance.updateCommentText(event)
      const updatedFields = wrapper.state().updatedFields.text;
      expect(updatedFields).toEqual(event);
    });

    it('test delete comment  function ', () => {
      const spy = jest.spyOn(instance, 'deleteComment');
      instance.deleteComment();
      expect(spy).toHaveBeenCalledTimes(1);
    });
    it('test toggle action menu function with true', () => {
      instance.toggleActionsMenu(true);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(true);
    })
    it('test toggle action menu function with false', () => {
      instance.toggleActionsMenu(false);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(false);
    })
    it('test toggle action menu function with undefiend', () => {
      instance.toggleActionsMenu(undefined);
      const showActionsMenu = wrapper.state().showActionsMenu
      expect(showActionsMenu).toEqual(true);
    })
  })

  describe('test click events', () => {
    it('test toggle action meny click event', () => {
      const spy = jest.spyOn(instance, 'toggleActionsMenu');
      wrapper.find('.action-menu-btn').simulate('click')
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })

  it('Test componentWillUnmount', () => {
    jest.spyOn(instance, 'componentWillUnmount')
    document.removeEventListener = () => {
        return true
    }
    instance.componentWillUnmount();
    expect(instance.componentWillUnmount).toHaveBeenCalled()
});

})

