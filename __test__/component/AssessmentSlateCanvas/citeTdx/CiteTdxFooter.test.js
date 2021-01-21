import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import CiteTdxFooter from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteTdxFooter/CiteTdxFooter'
let initialState = {
    citeTdxReducer:{ 
        currentAssessmentSelected:{
            "versionUrn":"dfer",
            "name":"mmoi"
        },
        citeApiData:{},
        tdxApiData:{},
        mmiApiData:{},
        isLoading:{},
        currentSingleAssessmentSelected:{},
 },
};
describe('Testing CITE/TDX Footer component', () => {
    
    let props = {
        isReset:{},
        resetPage: function () { },
        closeWindowAssessment:function () { },
        getCiteTdxData:function () { },
        getCurrentPageNo:function () { },
        currentPageNo: 1,
        addCiteTdxFunction:function () { },
        currentAssessmentSelected:{
            "versionUrn":"dfer",
            "name":"mmoi"
        },
        "openedFrom":"slateAssessment",
        "isInnerComponent": true,
        setCiteTdxFilterData: jest.fn()

    }
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><CiteTdxFooter {...props}/></Provider>);
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
            isReset:{},
            resetPage: function () { },
            closeWindowAssessment:function () { },
            getCiteTdxData:function () { },
            getCurrentPageNo:function () { },
            currentPageNo: 1,
            addCiteTdxFunction:function () { },
            currentAssessmentSelected:{
                "versionUrn":"dfer",
                "name":"mmoi"
            },
            "openedFrom":"singleSlateAssessmentInner",
            setCiteTdxFilterData: jest.fn()
    
        }
        const component = mount(<Provider store={store}><CiteTdxFooter {...props}/></Provider>);
         let componentInstance = component.find('CiteTdxFooter').instance();
         const spySendCiteTdxAssessment = jest.spyOn(componentInstance, 'sendCiteTdxAssessment')
        componentInstance.sendCiteTdxAssessment();
        expect(spySendCiteTdxAssessment).toHaveBeenCalled()
        spySendCiteTdxAssessment.mockClear()
    })

});
