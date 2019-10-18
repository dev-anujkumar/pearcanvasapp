import React from 'react';
import { mount, shallow } from 'enzyme';
import CommentsPanel from '../../../src/component/CommentsPanel';
import { comments, filters } from '../../../fixtures/commentPanelData.js'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';

const mockStore = configureMockStore(middlewares);
const store = mockStore({
  commentsPanelReducer: {
    comments: comments,
    togglePanel: true,
    toggleReplyForm: true
  }
});
describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(<Provider store={store}>< CommentsPanel comments={comments} /> </Provider>)
  const instance = wrapper.find('CommentsPanel').instance();
  describe('Testing rendering component with props', () => {
    it('should have search component', () => {
      expect(wrapper.find(".panel-navigation__header-title")).toHaveLength(1)
    }),

      it('Should have 1 comment canvas', () => {
        expect(wrapper.find('.comments-canvas')).toHaveLength(1)
      })

  })
  describe('Testing component with comments', () => {
    let wrapper = mount(<Provider store={store}>< CommentsPanel comments={comments} /> </Provider>);
    const instance = wrapper.find('CommentsPanel').instance();
    it('renders renderComment function correctly', () => {
      instance.renderComment(comments, filters)
    });
    it('tests serches comment  correctly', () => {
      let event = { target: { value: "Newest to Oldest" } }
      instance.handleSearchInput(event)
      const status = wrapper.find('CommentsPanel').state().filters.text;
      expect(status).toEqual("Newest to Oldest");
    });

    it('tests the closeall dropdown function correctly', () => {
      instance.closeAllDropdown();
    });
  })

  describe('Testing toggle dropdown function with comments', () => {
    it('tests toogle stautus dropdown with true function correctly', () => {
      instance.toggleStatusDropdown(true)
      console.log("status====?", wrapper.find('CommentsPanel').state().showStatusDropdown)
      const showStatusDropdown = wrapper.find('CommentsPanel').state().showStatusDropdown;
      const showSortByDropdown = wrapper.find('CommentsPanel').state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(true);
      expect(showSortByDropdown).toEqual(false);
    });

    it('tests toogle stautus dropdown with undefiend function correctly', () => {
      instance.toggleStatusDropdown(undefined)
      console.log("status====?", wrapper.find('CommentsPanel').state().showStatusDropdown)
      const showStatusDropdown = wrapper.find('CommentsPanel').state().showStatusDropdown;
      const showSortByDropdown = wrapper.find('CommentsPanel').state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(showStatusDropdown);
      expect(showSortByDropdown).toEqual(false);
    });
  })

  describe('Testing toggleOrderByDropdown dropdown function with comments', () => {
    it('tests toogle stautus dropdown with true function correctly', () => {
      instance.toggleOrderByDropdown(true)
      console.log("status====?", wrapper.find('CommentsPanel').state().showStatusDropdown)
      const showStatusDropdown = wrapper.find('CommentsPanel').state().showStatusDropdown;
      const showSortByDropdown = wrapper.find('CommentsPanel').state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(false);
      expect(showSortByDropdown).toEqual(true);
    });

    it('tests toogle stautus dropdown with undefiend function correctly', () => {
      instance.toggleOrderByDropdown(undefined)
      console.log("status====?", wrapper.find('CommentsPanel').state().showStatusDropdown)
      const showStatusDropdown = wrapper.find('CommentsPanel').state().showStatusDropdown;
      const showSortByDropdown = wrapper.find('CommentsPanel').state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(false);
      expect(showSortByDropdown).toEqual(false);
    });
  })

  describe('Testing set status dropdown function with comments', () => {
    it('tests set status with open value', () => {
      instance.setStatus("all")
      const status = wrapper.find('CommentsPanel').state().filters.status.value
      // const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(status).toEqual("all");
      // expect(showSortByDropdown).toEqual(true);
    });

    it('tests set status with open value', () => {
      instance.setStatus("resolved")
      console.log("status====?", wrapper.find('CommentsPanel').state().filters.status.value)
      const status = wrapper.find('CommentsPanel').state().filters.status.value
      // const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(status).toEqual("resolved");
      // expect(showSortByDropdown).toEqual(true);
    });

    it('tests set status with open value', () => {
      instance.setStatus("open")
      console.log("status====?", wrapper.find('CommentsPanel').state().filters.status.value)
      const status = wrapper.find('CommentsPanel').state().filters.status.value
      // const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(status).toEqual("open");
      // expect(showSortByDropdown).toEqual(true);
    });

  })
  describe('Testing set sort dropdown function with comments', () => {
    let target = {
      dataset: {
        value: '1'
      },
      textContent: "Oldest to Newest"
    }
    it('tests set status with open value', () => {
      instance.setSort({ target })
      console.log("status====?", wrapper.find('CommentsPanel').state().filters.sortBy.value)
      const status = wrapper.find('CommentsPanel').state().filters.sortBy.value
      // const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(status).toEqual("1");
      // expect(showSortByDropdown).toEqual(true);
    });

    it('tests set status with open value', () => {
      let target = {
        dataset: { value: '-1' },
        textContent: "Newest to Oldest"
      }
      instance.setSort({ target })
      console.log("status====?", wrapper.find('CommentsPanel').state().filters.sortBy.value)
      const status = wrapper.find('CommentsPanel').state().filters.sortBy.value
      // const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(status).toEqual("-1");
      // expect(showSortByDropdown).toEqual(true);
    });

  })
  describe('Testing filter function with cases', () => {
    let wrapper = mount(<Provider store={store}><CommentsPanel comment={comments} /></Provider>);
    const instance = wrapper.find('CommentsPanel').instance();
    it('renders filter function with default sorting', () => {
      expect(instance.filterComments(comments, filters).length).toBe(2);
    });
    it('renders filter function with sort  Oldest to newest  sorting and status open', () => {
      let filters = { text: '', sortBy: { value: "1" }, status: { value: "open" } }
      expect(instance.filterComments(comments, filters).length).toBe(1);
    });

    it('renders filter function with sort  Oldest to newest  sorting and status resolved', () => {
      let filters = { text: '', sortBy: { value: "1" }, status: { value: "resolved" } }
      expect(instance.filterComments(comments, filters).length).toBe(1);
    });
  })

  describe('Testing action function with props', () => {
    let wrapper = mount(<Provider store={store}><CommentsPanel comment={comments} /></Provider>);
    const instance = wrapper.find('CommentsPanel').instance();
    it('renders updateElementComment ', () => {
      instance.updateElementComment();
    });
    it('renders update reply function ', () => {
      let commenturn = "urn:pearson:comment:90a27e87-9630-47e5-a5d8-ef2fe0e3626c",
        reply = {
          commentType: "commentReply",
          commentCreator: "c5test01",//auth.user.userId,
          commentString: "test",
          commentOnEntity: "urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5"
        },
        elementId = 'urn:pearson:work:2178488a-ca91-48d7-bc48-44684c92eaf5'

      instance.updateReplyComment(commenturn, reply, elementId);
    });
    it('tests update resolves function ', () => {
      instance.updateResolveComment();
    });
    it('tests get project users resolves function ', () => {
      instance.getProjectUsers();
    });

    it('tests delete function  function ', () => {
      instance.deleteComment();
    });
    it('tests update assigneee function  function ', () => {
      instance.updateAssignee();
    });
  })


})
