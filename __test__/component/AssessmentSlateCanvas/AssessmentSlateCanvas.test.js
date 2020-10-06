import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import  AssessmentSlateCanvas  from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import {assessmentSlateDefault, } from "./../../../fixtures/AssessmentSlateCanvasTestingData";
const mockStore = configureMockStore(middlewares);
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
let initialState = {
        elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
        },
        errFlag: false,
        errorStatus: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: {},
        permissions: [
            'quad_linking_assessment'
        ],
        usageTypeListData:{usageTypeList:""}
    },
    learningToolReducer:{
        learningTypeSelected:""
    }
};
let props = {
            handleFocus: function(){},
            handleBlur : function(){},
            model : assessmentSlateDefault,
            onClick : ()=>{},
            slateLockInfo: {
                isLocked: false,
                timestamp: "",
                userId: ""
            },
            isLOExist:jest.fn()
        }
describe('Testing Assessment Slate Canvas component', () => {
    let store = mockStore(initialState);
    let component = mount(<Provider store={store}><AssessmentSlateCanvas {...props}/></Provider>)
    let assessmentSlateInstance = component.find('AssessmentSlateCanvas').instance(); 
    test('renders without crashing', () => {
        expect(component).toHaveLength(1);
        expect(assessmentSlateInstance).toBeDefined();
    })
    it('Test- UpdateAssessment', async () => {
        let pufObj = {
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title: "Open response question updated",
            assessmentFormat: "puf",
            usagetype: "Quiz"
        }
        jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        assessmentSlateInstance.updateAssessment(pufObj.id);
        assessmentSlateInstance.forceUpdate();
        component.update();
        expect(assessmentSlateInstance.state.getAssessmentData).toEqual(false)
    });
    it('Test- handleAssessmentFocus', async () => {
        jest.spyOn(assessmentSlateInstance, 'handleAssessmentFocus')
        assessmentSlateInstance.handleAssessmentFocus();      
    });
    
});
