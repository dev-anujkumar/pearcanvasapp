import React from 'react';

import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import RootSingleAssessmentComponent from '../../../../src/component/AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx';
let initialState = {
    citeTdxReducer:{ 
        currentAssessmentSelected:{
         }
 },
};

describe('Cite/TDX single root component test', () => {
    it('renders without crashing', () => {
        let store = mockStore(initialState);
        let props={
            getSingleAssessmentData:jest.fn()
        }
        const component = mount(<Provider store={store}><RootSingleAssessmentComponent {...props}/></Provider>)
        expect(component).toHaveLength(1);

    })

});