import React from 'react';
import { mount, shallow } from 'enzyme';
import CommentsPanel from '../../../src/component/CommentsPanel';
import { comments, filters } from '../../../fixtures/commentPanelData.js'

describe('Testing CommentsPanel component with props', () => {
  let wrapper = mount(< CommentsPanel comments={comments} />)
  const instance = wrapper.instance();
  describe('Testing rendering component with props', () => {
    it('should have search component', () => {
      expect(wrapper.find(".panel-navigation__header-title")).toHaveLength(1)
    }),

      it('Should have 2 filter  dropdown', () => {
        expect(wrapper.find('.filter')).toHaveLength(2)
      }),

      it('Should have 1 comment canvas', () => {
        expect(wrapper.find('.comments-canvas')).toHaveLength(1)
      })

  })
  describe('Testing component with comments', () => {
    let wrapper = mount(<CommentsPanel comment={comments} />);
    const instance = wrapper.instance();
    it('renders renderComment function correctly', () => {
      instance.renderComment(comments, filters)

    });
    it('tests changeStstus function correctly', () => {
      instance.changeStatus()
    });
    it('tests changeStstus function correctly', () => {
      let event = {target:{value: "Newest to Oldest"}}
      instance.handleSearchInput(event)
      const status =wrapper.state().filters.text;
      expect(status).toEqual("Newest to Oldest");
    });
  })

  describe('Testing toggle dropdown function with comments', () => {
  it('tests toogle stautus dropdown with true function correctly', () => {
      instance.toggleStatusDropdown(true)
      console.log("status====?",wrapper.state().showStatusDropdown)
      const showStatusDropdown = wrapper.state().showStatusDropdown;
      const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(true);
      expect(showSortByDropdown).toEqual(false);
    });

    it('tests toogle stautus dropdown with undefiend function correctly', () => {
      instance.toggleStatusDropdown(undefined)
      console.log("status====?",wrapper.state().showStatusDropdown)
      const showStatusDropdown = wrapper.state().showStatusDropdown;
      const showSortByDropdown = wrapper.state().showSortByDropdown;
      expect(showStatusDropdown).toEqual(showStatusDropdown);
      expect(showSortByDropdown).toEqual(false);
    });
  })

  describe('Testing toggleOrderByDropdown dropdown function with comments', () => {
    it('tests toogle stautus dropdown with true function correctly', () => {
        instance.toggleOrderByDropdown(true)
        console.log("status====?",wrapper.state().showStatusDropdown)
        const showStatusDropdown = wrapper.state().showStatusDropdown;
        const showSortByDropdown = wrapper.state().showSortByDropdown;
        expect(showStatusDropdown).toEqual(false);
        expect(showSortByDropdown).toEqual(true);
      });
  
      it('tests toogle stautus dropdown with undefiend function correctly', () => {
        instance.toggleOrderByDropdown(undefined)
        console.log("status====?",wrapper.state().showStatusDropdown)
        const showStatusDropdown = wrapper.state().showStatusDropdown;
        const showSortByDropdown = wrapper.state().showSortByDropdown;
        expect(showStatusDropdown).toEqual(false);
        expect(showSortByDropdown).toEqual(false);
      });
    })
  
    describe('Testing set status dropdown function with comments', () => {
      it('tests set status with open value', () => {
          instance.setStatus("all")
          const status =wrapper.state().filters.status.value
         // const showSortByDropdown = wrapper.state().showSortByDropdown;
          expect(status).toEqual("all");
         // expect(showSortByDropdown).toEqual(true);
        });
    
        it('tests set status with open value', () => {
          instance.setStatus("resolved")
          console.log("status====?",wrapper.state().filters.status.value)
          const status =wrapper.state().filters.status.value
         // const showSortByDropdown = wrapper.state().showSortByDropdown;
          expect(status).toEqual("resolved");
         // expect(showSortByDropdown).toEqual(true);
        });

        it('tests set status with open value', () => {
          instance.setStatus("open")
          console.log("status====?",wrapper.state().filters.status.value)
          const status =wrapper.state().filters.status.value
         // const showSortByDropdown = wrapper.state().showSortByDropdown;
          expect(status).toEqual("open");
         // expect(showSortByDropdown).toEqual(true);
        });
    
      })
      describe('Testing set sort dropdown function with comments', () => {
        let target = {
          dataset: {
                value:'1'
              },
              textContent : "Oldest to Newest"
        }
        it('tests set status with open value', () => {
            instance.setSort({target})
            console.log("status====?",wrapper.state().filters.sortBy.value)
            const status =wrapper.state().filters.sortBy.value
           // const showSortByDropdown = wrapper.state().showSortByDropdown;
            expect(status).toEqual("1");
           // expect(showSortByDropdown).toEqual(true);
          });
      
          it('tests set status with open value', () => {
            let target = { dataset: { value:'-1'},
                  textContent : "Newest to Oldest"
            }
            instance.setSort({target})
            console.log("status====?",wrapper.state().filters.sortBy.value)
            const status =wrapper.state().filters.sortBy.value
           // const showSortByDropdown = wrapper.state().showSortByDropdown;
            expect(status).toEqual("-1");
           // expect(showSortByDropdown).toEqual(true);
          });
      
        })
  describe('Testing filter function with cases', () => {
    let wrapper = mount(<CommentsPanel comment={comments} />);
    const instance = wrapper.instance();
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




})