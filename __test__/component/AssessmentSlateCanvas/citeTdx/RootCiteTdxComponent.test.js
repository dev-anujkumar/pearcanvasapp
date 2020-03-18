import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import RootCiteTdxComponent from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
let initialState = {
    citeTdxReducer:{ 
        currentAssessmentSelected:{
         }
 },
};

describe('Cite/TDX single root component test', () => {
    let store = mockStore(initialState);
    let props={
        getSingleAssessmentData:jest.fn(),
        searchTitle:"mmoi",
        filterUUID: "728828289236",
        filterCiteTdxData:jest.fn(),
        getCiteTdxData:jest.fn()

    }
    const component = mount(<Provider store={store}><RootCiteTdxComponent {...props}/></Provider>)
    let componentInstance = component.find('RootCiteTdxComponent').instance();
    const spyPageNo = jest.spyOn(componentInstance, 'getCurrentPageNo')
    it('renders without crashing', () => {
        expect(component).toHaveLength(1);

    })

    it('get page number', () => {
        componentInstance.getCurrentPageNo(2);
        expect(spyPageNo).toHaveBeenCalled()
        spyPageNo.mockClear()

    })

});