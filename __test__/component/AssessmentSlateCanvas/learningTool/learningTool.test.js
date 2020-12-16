import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import LearningTool from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningTool';
import { tempFiguresForResults, disciplines, selectedResult, learningSystemList } from '../../../../fixtures/learningTool'

const mockStore = configureMockStore(middlewares);
const store = mockStore({
    learningToolReducer: {
        apiResponse: tempFiguresForResults,
        showLTBody: true,
        learningSystems: learningSystemList,
        linkButtonDisable: true,
        apiResponseForDis: disciplines.options,
        showDisFilterValues: true,
        selectedResultFormApi: selectedResult
    }
});

describe('Testing LearningTool component', () => {
    let props = {
        closePopUp: jest.fn(),
        linkLearningApp: jest.fn(),
        closelearningPopup: jest.fn(),
        toolTypeFilterSelectedAction: jest.fn(),
        closeLtAction: jest.fn(),
        selectedFigureAction: jest.fn(),
        learningToolDisFilterAction: jest.fn(),
        learningToolSearchAction: jest.fn(),
        paginationFunctionAction: jest.fn(),
        removeSelectedData: jest.fn()
    }
    let wrapper = mount(<Provider store={store}>< LearningTool  {...props} /></Provider>)
    const instance = wrapper.find('LearningTool').instance();
    it('Render LearningTool', () => {
        expect(wrapper).toHaveLength(1);
        expect(instance).toBeDefined();
        expect(wrapper.find(".learningToolContainer")).toHaveLength(1)
    })
    it('Test setlearningAppType', () => {
        instance.setlearningAppType('helpdesk');
        expect(instance.state.selectedLearningAppType).toBe('helpdesk')
    });
    it('Test setlearningToolDiscipline', () => {
        instance.setlearningToolDiscipline('art');
        expect(instance.state.selectedLearningDiscipline).toBe('art')
    });
    it('Test closeLt', () => {
        instance.closeLt();
        expect(instance.props.closelearningPopup).toHaveBeenCalled();
    })
    it('Test learningToolSearchClick', () => {
        instance.learningToolSearchClick();
        expect(instance.state.selectedLearningAppType).toBe('helpdesk')
        expect(instance.state.showError).toBe(false)
    })
    it('Test selectedFigure', () => {
        jest.spyOn(instance, 'selectedFigure')
        instance.selectedFigure(selectedResult);
        expect(instance.selectedFigure).toHaveBeenCalledWith(selectedResult)
        expect(typeof instance.props.learningToolSearchAction).toBe("function")
    })
    it('Test validateSearch', () => {
        instance.validateSearch('@');
        expect(instance.state.showError).toBe(true)
        instance.validateSearch('Test');
        expect(instance.state.showError).toBe(false);
    })
    it('Test linkLearningApp', () => {
        jest.spyOn(instance, 'linkLearningApp')
        instance.linkLearningApp();
        expect(instance.linkLearningApp).toHaveBeenCalled();
        expect(typeof instance.props.linkLearningApp).toBe("function");
    })
})
