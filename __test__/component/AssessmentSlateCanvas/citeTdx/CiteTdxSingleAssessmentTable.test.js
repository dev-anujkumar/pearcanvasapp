import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import CiteTdxTable from '../../../../src/component/AssessmentSlateCanvas/singleAssessmentCiteTdx/CiteTdxSingleAssessmentTable'
let initialState = {
    citeTdxReducer: {
        currentAssessmentSelected: {
            "versionUrn": "dfer",
            "name": "mmoi"
        },
        citeApiData: { assessments: { "dfsarfw": "Sdfa" } },
        tdxApiData: { assessments: { "dfsarfw": "Sdfa" } },
        mmiApiData: { assessments: { "dfsarfw": "Sdfa" } },
        isLoading: false,
        currentSingleAssessmentSelected: { "versionUrn": "dfer", },
        citeErrorFlag: "",
        assessmenterrFlag: false

    },
};
describe('Table component', () => {
    let props = {
        assessmentType: "Full Assessment CITE",
        assessmenterrFlag: false,
        isLoading: false,
        citeApiData: { assessments: { "dfsarfw": "Sdfa" } },
        tdxApiData: { assessments: { "dfsarfw": "Sdfa" } },
        mmiApiData: { assessments: { "dfsarfw": "Sdfa" } },

    }
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><CiteTdxTable {...props} /></Provider>);
    let componentInstance = component.find('CiteTdxTable').instance();
    const spyaddAssessment = jest.spyOn(componentInstance, 'addAssessment')

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    })
    it('add assessment', () => {
        componentInstance.addAssessment({"versionUrn":"nk"});
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    })
});