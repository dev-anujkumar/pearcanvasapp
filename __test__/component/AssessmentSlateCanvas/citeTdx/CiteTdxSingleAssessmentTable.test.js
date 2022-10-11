import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import CiteTdxTable from '../../../../src/component/AssessmentSlateCanvas/singleAssessmentCiteTdx/CiteTdxSingleAssessmentTable'
import CiteTdxSingleAssessmentTable from '../../../../src/component/AssessmentSlateCanvas/singleAssessmentCiteTdx/CiteTdxSingleAssessmentTable';
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
        assessmenterrFlag: false,
        singleAssessmentData: {
            data: [{ "versionUrn": "dfer",
            "dateModified": "2019-01-04T21:13:53.711Z",
            "modifiedBy": "LOMT-ADMIN"} ]
        },
    },
};
let initialState2 = {
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
        assessmenterrFlag: false,
        singleAssessmentData: {
            data: [{ "versionUrn": "dfer"} ]
        },
    },
};

describe('Table component', () => {
    let props = {
        assessmentType: "Full Assessment QuAD CITE",
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
    it('add assessment', () => {
        componentInstance.addAssessment({"versionUrn":"nk"});
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    })
    it('AlfrescoPopup handleClose',() => {
        const mockFn = jest.fn()
        const wrapper = mount(<Provider store={store}><CiteTdxSingleAssessmentTable {...props} /></Provider>);
        const button = wrapper.find('.radio-button').at(0)
        button.simulate('click')
        expect(mockFn).toBeTruthy()
    })
});
describe('Table component', () => {
    let props = {
        assessmentType: "Full Assessment QuAD CITE",
        assessmenterrFlag: false,
        isLoading: false,
        citeApiData: { assessments: { "dfsarfw": "Sdfa" } },
        tdxApiData: { assessments: { "dfsarfw": "Sdfa" } },
        mmiApiData: { assessments: { "dfsarfw": "Sdfa" } },
        onClick: jest.fn(),
    }
    let store = mockStore(initialState2);
    const component2 = mount(<Provider store={store}><CiteTdxTable {...props} /></Provider>);
    let componentInstance2 = component2.find('CiteTdxTable').instance();
    const spyaddAssessment2 = jest.spyOn(componentInstance2, 'addAssessment')

    it('renders without crashing', () => {
        expect(component2).toHaveLength(1);
    })
    it('add assessment', () => {
        componentInstance2.addAssessment({"versionUrn":"nk"});
        expect(spyaddAssessment2).toHaveBeenCalled()
        spyaddAssessment2.mockClear()
    })
    it('add assessment', () => {
        componentInstance2.addAssessment({"versionUrn":"nk"});
        expect(spyaddAssessment2).toHaveBeenCalled()
        spyaddAssessment2.mockClear()
    })
});