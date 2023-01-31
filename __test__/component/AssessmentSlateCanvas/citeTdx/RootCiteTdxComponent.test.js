import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import RootCiteTdxComponent from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import CiteComponentError from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteError/CiteComponentError'

let initialState = {
    citeTdxReducer: {
        currentAssessmentSelected: {
        },
        searchTitleVal: "test",
        searchUuidVal: "test1"
    },
    projectInfo: { isBannerVisible: true },
    searchTitle: "mmoi",
    filterUUID: "728828289236",
    openedFrom: "slateAssessment"
};
let initialState1 = {
    citeTdxReducer: {
        currentAssessmentSelected: {}
    },
    projectInfo: { isBannerVisible: false }
};

describe('Cite/TDX single root component test', () => {
    let store = mockStore(initialState);
    let store1 = mockStore(initialState1);

    let props = {
        getSingleAssessmentData: jest.fn(),
        searchTitle: "mmoi",
        filterUUID: "728828289236",
        filterCiteTdxData: jest.fn(),
        getCiteTdxData: jest.fn(),
        citeTdxReducer: {
            currentAssessmentSelected: {
            },
            searchTitleVal: "test",
            searchUuidVal: "test"
        },
        openedFrom: "slateAssessment"
    }

    let props1 = {
        getSingleAssessmentData: jest.fn(),
        filterCiteTdxData: jest.fn(),
        getCiteTdxData: jest.fn(),
        citeTdxReducer: {
            currentAssessmentSelected: {
            },
            searchTitleVal: "test",
            searchUuidVal: "test1"
        },
        openedFrom: "slateAssessment"
    }

    let props2 = {
        getSingleAssessmentData: jest.fn(),
        searchTitle: "mmoi",
        filterUUID: "728828289236",
        filterCiteTdxData: jest.fn(),
        getCiteTdxData: jest.fn(),
        citeTdxReducer: {
            currentAssessmentSelected: {
            },
            searchTitleVal: "test",
            searchUuidVal: "test1"
        },
    }

    beforeAll(() => {
        const CiteComponentErrorComponent = shallow(<CiteComponentError><h1>wassup</h1></CiteComponentError>)
        CiteComponentErrorComponent.instance().componentDidCatch('oh nooos an error')
        CiteComponentErrorComponent.update()
    })

    const component = mount(<Provider store={store}><RootCiteTdxComponent {...props} /></Provider>)
    const component1 = mount(<Provider store={store}><RootCiteTdxComponent {...props1} /></Provider>)
    const component2 = mount(<Provider store={store1}><RootCiteTdxComponent {...props2} /></Provider>)
    let componentInstance = component.find('RootCiteTdxComponent').instance();
    const spyPageNo = jest.spyOn(componentInstance, 'getCurrentPageNo')
    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
        expect(component1).toHaveLength(1);
        expect(component2).toHaveLength(1);

    })

    it('get page number', () => {
        componentInstance.getCurrentPageNo(2);
        expect(spyPageNo).toHaveBeenCalled()
        spyPageNo.mockClear()

    })

});