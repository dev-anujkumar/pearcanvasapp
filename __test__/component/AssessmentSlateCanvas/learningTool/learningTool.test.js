import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import LearningTool from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningTool';
import {tempFiguresForResults,disciplines} from '../../../../fixtures/learningTool'
import { spy, stub } from 'sinon';
const mockStore = configureMockStore(middlewares);
const store = mockStore({
    learningToolReducer: {
        apiResponse:tempFiguresForResults
    }
});
const linkLearningApp = new stub();
const closePopUp = new stub();
const closelearningPopup = new stub();
const selectedFigure = new stub();
const learningAppType = new stub();
xdescribe('Testing Learning tool component with props', () => {
    let wrapper = mount(<Provider store={store}>
        < LearningTool
            linkLearningApp={linkLearningApp}
            closePopUp = {closePopUp}
            closelearningPopup= {closelearningPopup}
            selectedFigure = {selectedFigure}
            learningAppType = {learningAppType}
        /> </Provider>)
    const instance = wrapper.find('LearningTool').instance();

    describe('Testing rendering component with props', () => {
        it('should have render component', () => {
            expect(wrapper.find(".learningToolContainer")).toHaveLength(1)
        })
        it('should have render learningToolHeader ', () => {
            expect(wrapper.find(".learningToolHeader")).toHaveLength(1)
        })
        it('should have render learningToolHeaderTypeFilter ', () => {
            expect(wrapper.find(".learningToolHeaderTypeFilter")).toHaveLength(1)
        })
    })

    describe('Test cases for function', () => {
        it('Should render linkLearningApp function correctly', () => {
            instance.linkLearningApp();
        })
        it('Should render validateSearch function correctly with corret value', () => {
            let event = {
                target: {
                  value: "test"
                }
              }
            instance.validateSearch(event);
        })
        it('Should render validateSearch function correctly with incorrect value', () => {
            let event = {
                target: {
                  value: "$##"
                }
              }
            instance.validateSearch(event);
        })
        it('Should render ltBodyJsx  function correctly with incorrect value', () => {

            instance.ltBodyJsx(tempFiguresForResults);
        })

        it('Should render nextPage  function correctly with incorrect value', () => {
            wrapper.setState({ currentPage: 1 });
            instance.nextPage();
          
        })
        it('Should render prevPage  function correctly with incorrect value', () => {
            wrapper.setState({ currentPage: 3});
            instance.prevPage();
            
        })

        it('Should render paginationFunction  function correctly with incorrect value', () => {
            let event = {
                target: {
                  value: 1
                }
              }
            instance.paginationFunction(event);
            const currentPage = wrapper.state().currentPage;
            expect(currentPage).toEqual(3);
            
        })

        it('Should render selectedFigure  function correctly with incorrect value', () => {
            instance.selectedFigure();
            
        })
        it('Should render renderDisFilter   function correctly with incorrect value', () => {
            instance.renderDisFilter(disciplines);
            
        })
        it('Should render learningToolSearch   function correctly with incorrect value', () => {
            let event = {
                target: {
                  value: 1
                }
              }
            instance.learningToolSearch(event,"moke");
            
        })

        it('Should render hideLTOnOuterClick function correctly with incorrect value', () => {
           
            instance.hideLTOnOuterClick();
            
        })

        it('Should render learningToolDisFilter function correctly with incorrect value', () => {
            let event = {
                target: {
                  value: "art"
                }
              }
            instance.learningToolDisFilter(event);
            
        })

        it('Should render learningAppType  function correctly with incorrect value', () => {
            let event = {
                target: {
                  value: "art"
                }
              }
            instance.learningAppType(event);
        })


    })

    

})