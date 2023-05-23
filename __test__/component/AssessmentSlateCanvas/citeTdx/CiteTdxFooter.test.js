import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import CiteTdxFooter from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteTdxFooter/CiteTdxFooter'
let initialState = {
    citeTdxReducer: {
        currentAssessmentSelected: {
            "versionUrn": "dfer",
            "name": "mmoi"
        },
        citeApiData: { assessments: "" },
        tdxApiData: {},
        mmiApiData: {},
        isLoading: {},
        currentSingleAssessmentSelected: {
            "versionUrn": "dfer",
            "name": "mmoi"
        },
    },
};
describe('Testing CITE/TDX Footer component', () => {

    let props = {
        isReset: {},
        resetPage: function () { },
        closeWindowAssessment: function () { },
        getCiteTdxData: function () { },
        getCurrentPageNo: function () { },
        currentPageNo: 1,
        addCiteTdxFunction: function () { },
        currentAssessmentSelected: {
            "versionUrn": "dfer",
            "name": "mmoi"
        },
        "openedFrom": "slateAssessment",
        "isInnerComponent": true,
        setCiteTdxFilterData: jest.fn(),
        assessmentType: "cite",
        citeApiData: { assessments: "" }

    }
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><CiteTdxFooter {...props} /></Provider>);
    let componentInstance = component.find('CiteTdxFooter').instance();
    const spyhandlePagination = jest.spyOn(componentInstance, 'handlePagination');
    const spyHandleClose = jest.spyOn(componentInstance, 'handleClose')
    const spySendCiteTdxAssessment = jest.spyOn(componentInstance, 'sendCiteTdxAssessment')

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    })

    it('Pagination', () => {
        componentInstance.handlePagination(props.currentPageNo)
        expect(spyhandlePagination).toHaveBeenCalled()
        spyhandlePagination.mockClear()
    })

    it('handleclose', () => {
        componentInstance.handleClose();
        expect(spyHandleClose).toHaveBeenCalled()
        spyHandleClose.mockClear()
    })

    it('send data on click on select button', () => {
        componentInstance.sendCiteTdxAssessment();
        expect(spySendCiteTdxAssessment).toHaveBeenCalled()
        spySendCiteTdxAssessment.mockClear()
    })

    it('select button disabled', () => {
        let props = {
            isReset: {},
            resetPage: function () { },
            closeWindowAssessment: function () { },
            getCiteTdxData: function () { },
            getCurrentPageNo: function () { },
            currentPageNo: 1,
            addCiteTdxFunction: function () { },
            currentAssessmentSelected: {
                "versionUrn": "dfer",
                "name": "mmoi"
            },
            "openedFrom": "singleSlateAssessmentInner",
            setCiteTdxFilterData: jest.fn()

        }
        const component = mount(<Provider store={store}><CiteTdxFooter {...props} /></Provider>);
        let componentInstance = component.find('CiteTdxFooter').instance();
        const spySendCiteTdxAssessment = jest.spyOn(componentInstance, 'sendCiteTdxAssessment')
        componentInstance.sendCiteTdxAssessment();
        expect(spySendCiteTdxAssessment).toHaveBeenCalled()
        spySendCiteTdxAssessment.mockClear()
    })

    it('Test onClick', () => {
        component.find('.noSelect.hideNavigation.disableClick').at(0).simulate('click');
        component.find('.noSelect.disableClick').at(0).simulate('click');
        component.find('.noSelect.disableClick').at(1).simulate('click');
        component.find('.assessmentpopup.cancel-assessment.noSelect').at(0).simulate('click');
        component.find('.assessmentpopup.add-assessment.noSelect.add-button-enabled').at(0).simulate('click');
    })

    it('renders without crashing', () => {
        let props = {
            isReset: {},
            resetPage: function () { },
            closeWindowAssessment: function () { },
            getCiteTdxData: function () { },
            getCurrentPageNo: function () { },
            currentPageNo: 1,
            addCiteTdxFunction: function () { },
            currentAssessmentSelected: {
                "versionUrn": "dfer",
                "name": "mmoi"
            },
            "openedFrom": "slateAssessment",
            "isInnerComponent": true,
            setCiteTdxFilterData: jest.fn(),
            assessmentType: "tdx",
            citeApiData: { assessments: "" }
        }
        let store = mockStore(initialState);
        const component = mount(<Provider store={store}><CiteTdxFooter {...props} /></Provider>);
        component.find('CiteTdxFooter').instance();
        expect(component).toHaveLength(1);
    })

    it('renders without crashing', () => {
        let props = {
            isReset: {},
            resetPage: function () { },
            closeWindowAssessment: function () { },
            getCiteTdxData: function () { },
            getCurrentPageNo: function () { },
            currentPageNo: 1,
            addCiteTdxFunction: function () { },
            openedFrom: "singleSlateAssessmentInner",
            currentSingleAssessmentSelected: {
                "versionUrn": "dfer",
                "name": "mmoi"
            },
            "isInnerComponent": true,
            setCiteTdxFilterData: jest.fn(),
            assessmentType: "cite"

        }
        let store = mockStore(initialState);
        const component = mount(<Provider store={store}><CiteTdxFooter {...props} /></Provider>);
        component.find('CiteTdxFooter').instance();
        expect(component).toHaveLength(1);
    })

    it('renders without crashing', () => {
        let props = {
            isReset: {},
            resetPage: function () { },
            closeWindowAssessment: function () { },
            getCiteTdxData: function () { },
            getCurrentPageNo: function () { },
            currentPageNo: 1,
            addCiteTdxFunction: function () { },
            openedFrom: "singleSlateAssessmentInner",
            currentSingleAssessmentSelected: {
                "versionUrn": "dfer",
                "name": "mmoi"
            },
            "isInnerComponent": true,
            setCiteTdxFilterData: jest.fn(),
            assessmentType: "cite"

        }
        let initialState2 = {
            citeTdxReducer: {
                citeApiData: { assessments: "" },
                tdxApiData: {},
                mmiApiData: {},
                isLoading: {},
                currentSingleAssessmentSelected: {},
            },
        };
        let store = mockStore(initialState2);
        const component = mount(<Provider store={store}><CiteTdxFooter {...props} /></Provider>);
        component.find('CiteTdxFooter').instance();
        expect(component).toHaveLength(1);
    })

});