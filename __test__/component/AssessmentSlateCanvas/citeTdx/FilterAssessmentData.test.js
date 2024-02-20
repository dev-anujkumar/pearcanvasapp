import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import FilterAssessmentData from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/FilterAssessmentData/FilterAssessmentData'

describe('Filter Assessment component', () => {
    let props = {
        setCurrentAssessment: {
            "title": 'Pearson Assessments',
            "id": "urn:setCurrentAssessment"
        },
        "openedFrom":"singleSlateAssessmentInner",
        setCurrentCiteTdx:jest.fn(),
        setCurrentInnerCiteTdx:jest.fn(),
        AssessmentSearchTitle:jest.fn(),
        resetPage:jest.fn(),
        filterUUID: "urn:test",
        searchTitle: "title:test"
    }
    let initialState={
        citeTdxReducer:{
            singleAssessmentTitle:{data:"mmi"},
            isLoading: true,
            sortBy:"name",
            sortOrder:1
        }
    }
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><FilterAssessmentData {...props} /></Provider>);
    let componentInstance = component.find('FilterAssessmentData').instance();
    const spyHandleChange = jest.spyOn(componentInstance, 'handleChange')
    const spyHandleSearch = jest.spyOn(componentInstance, 'handleSearch')
    const spyhandleBlur = jest.spyOn(componentInstance, 'handleBlur')
    const spyhandleFocus = jest.spyOn(componentInstance, 'handleFocus')

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    })

    it('handleChange Function', () => {
        const event = {
            target:{
                name: "mmoi",
                value:"720bbc68-cd1c-4cbd-b805-c54c06455c7c"
            }
        }
        componentInstance.handleChange(event);
        expect(spyHandleChange).toHaveBeenCalled()
        spyHandleChange.mockClear()
    })

    it('handleSearch Function', () => {
        const event = {
            preventDefault() { }
        }
        componentInstance.handleSearch(event);
        expect(spyHandleSearch).toHaveBeenCalled()
        spyHandleSearch.mockClear()
    })
    it('handleBlur Function', () => {
        const event = {
            preventDefault() { },
            target:{
                id:"assessTitleFocus"
            },
        }
        componentInstance.handleBlur(event);
        expect(spyhandleBlur).toHaveBeenCalled()
        spyhandleBlur.mockClear()
    })
    it('handleFocus Function', () => {
        const event = {
            target:{
                id:"assessUUIDFocus"
            },
            preventDefault() { }
        }
        componentInstance.handleFocus(event);
        expect(spyhandleFocus).toHaveBeenCalled()
        spyhandleFocus.mockClear()
    })

});
describe('Conditional Coverage for Filter Assessment Data', () => {
    let props2 = {
        setCurrentAssessment: {
            "title": 'Pearson Assessments',
            "id": ''
        },
        "openedFrom":"",
        setCurrentCiteTdx:jest.fn(),
        setCurrentInnerCiteTdx:jest.fn(),
        AssessmentSearchTitle:jest.fn(),
        resetPage:jest.fn()
    }
    let props3 = {
        "openedFrom":"",
        setCurrentCiteTdx:jest.fn(),
        setCurrentInnerCiteTdx:jest.fn(),
        AssessmentSearchTitle:jest.fn(),
        resetPage:jest.fn()
    }
    let initialState2={
        citeTdxReducer:{
            sortBy:"name",
            sortOrder:1
        }
    }
    let store = mockStore(initialState2);
    const component2 = mount(<Provider store={store}><FilterAssessmentData {...props2} /></Provider>);
    let componentInstance2 = component2.find('FilterAssessmentData').instance();
    const spyHandleSearch2 = jest.spyOn(componentInstance2, 'handleSearch')

    const component3 = mount(<Provider store={store}><FilterAssessmentData {...props3} /></Provider>);
    let componentInstance3 = component3.find('FilterAssessmentData').instance();
    const spyHandleSearch3 = jest.spyOn(componentInstance3, 'handleSearch')

    it('handleSearch Function', () => {
        const event = {
            preventDefault() { }
        }
        componentInstance2.handleSearch(event);
        expect(spyHandleSearch2).toHaveBeenCalled()
        spyHandleSearch2.mockClear()
    })

    it('handleSearch Function -> conditional coverage', () => {
        const event = {
            preventDefault() { }
        }
        componentInstance3.handleSearch(event);
        expect(spyHandleSearch3).toHaveBeenCalled()
        spyHandleSearch3.mockClear()
    })
})