import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AssessmentSlateCanvas from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas';
import { defaultAS, MockUsageTypeList_Data, assessmentSlateELM, assessmentSlateTDX } from "./../../../fixtures/AssessmentSlateCanvasTestingData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('../../../src/js/toggleLoader.js', () => ({
    hideToc: jest.fn(),
    showTocBlocker: jest.fn(),
    disableHeader: jest.fn(),
    hideTocBlocker: jest.fn(),
    ShowCanvasLoader: jest.fn(),
}))
jest.mock('../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions', () => ({
    specialCharacterDecode: jest.fn()
}))

let initialState = {
    appStore: {
        permissions: [
            'quad_linking_assessment',
            'quad_create_edit_ia'
        ],
        usageTypeListData: {
            usageTypeList: MockUsageTypeList_Data
        }
    },
    assessmentReducer: {}
};
let props = {
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
    model: defaultAS,
    onClick: jest.fn(),
    slateLockInfo: {
        isLocked: false,
        timestamp: "",
        userId: ""
    },
    isLOExist: jest.fn()
}
describe('Testing Assessment Slate Canvas component', () => {
    let store = mockStore(initialState);
    let component = mount(<Provider store={store}><AssessmentSlateCanvas {...props} /></Provider>)
    let assessmentSlateInstance = component.find('AssessmentSlateCanvas').instance();
    it('Test 1- Default AS', () => {
        expect(component).toHaveLength(1);
        expect(assessmentSlateInstance).toBeDefined();
        expect(component.find('div.AssessmentSlateMenu')).toHaveLength(1)
    });
    it('Test 2- UpdateAssessment -IF', () => {
        let updatePufObj = {
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title: "Open response question updated",
            format: "puf",
            usageType: "Quiz",
            change: "insert"
        }
        jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        assessmentSlateInstance.updateAssessment(updatePufObj.id, "", updatePufObj.title, updatePufObj.format, updatePufObj.usageType, updatePufObj.change);
        assessmentSlateInstance.forceUpdate();
        component.update();
        expect(assessmentSlateInstance.state.getAssessmentData).toEqual(false);
        expect(assessmentSlateInstance.state.getAssessmentDataPopup).toEqual(true);
    });
    it('Test 3- UpdateAssessment -ELSE', () => {
        let updatePufObj = {
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title: "Open response question updated",
            format: "puf",
            usageType: "Homework",
            change: "update"
        }
        jest.spyOn(assessmentSlateInstance, 'updateAssessment')
        assessmentSlateInstance.updateAssessment(updatePufObj.id, "", updatePufObj.title, updatePufObj.format, updatePufObj.usageType, updatePufObj.change);
        assessmentSlateInstance.forceUpdate();
        component.update();
        expect(assessmentSlateInstance.state.getAssessmentData).toEqual(false);
        expect(assessmentSlateInstance.state.getAssessmentDataPopup).toEqual(true);
    });
    it('Test 4- handleAssessmentFocus', () => {
        jest.spyOn(assessmentSlateInstance, 'handleAssessmentFocus')
        assessmentSlateInstance.handleAssessmentFocus();
        expect(assessmentSlateInstance.handleAssessmentFocus).toHaveBeenCalled();
    });
    describe('Test 5- addPufAssessment', () => {
        beforeEach(() => {
            jest.mock('../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js', () => ({
                setAssessmentFormat: jest.fn().mockImplementationOnce = () => {
                    return 'puf'
                },
                hasAssessmentID: jest.fn().mockImplementationOnce = () => {
                    return false
                },
                setAssessmentElement: jest.fn().mockImplementationOnce = () => {
                    return {
                        title: "Open response question updated",
                        itemId: "",
                        assessmentId: "urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"
                    }
                },
                setAssessmentUsageType: jest.fn().mockImplementationOnce = () => {
                    return 'Quiz'
                },
            }));
        })
        it('Test 5- addPufAssessment', () => {
            let pufObj = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                title: "Updated PUF",
                usagetype: "Homework",
            }
            let componentPuf = mount(<Provider store={store}><AssessmentSlateCanvas {...props} model={assessmentSlateELM} /></Provider>)
            let pufInstance = componentPuf.find('AssessmentSlateCanvas').instance();
            jest.spyOn(pufInstance, 'addPufAssessment')
            pufInstance.addPufAssessment(pufObj, 'puf');
            componentPuf.update();
            pufInstance.forceUpdate();
            expect(pufInstance.state.assessmentFormat).toEqual('puf');
            expect(pufInstance.state.getAssessmentData).toEqual(true);
            expect(pufInstance.state.getAssessmentDataPopup).toEqual(false);
            expect(pufInstance.addPufAssessment).toHaveBeenCalledWith(pufObj, 'puf');
        });
    })
    describe('Test 6- addCiteTdxAssessment', () => {
        beforeEach(() => {
            jest.mock('../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js', () => ({
                setAssessmentFormat: jest.fn().mockImplementationOnce = () => {
                    return 'tdx'
                },
                hasAssessmentID: jest.fn().mockImplementationOnce = () => {
                    return false
                },
                setAssessmentElement: jest.fn().mockImplementationOnce = () => {
                    return {
                        title: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a1",
                        itemId: "",
                        assessmentId: "TDX Assessment"
                    }
                },
                setAssessmentUsageType: jest.fn().mockImplementationOnce = () => {
                    return 'Homework'
                },
            }));
        })
        it('Test 6- addCiteTdxAssessment', () => {
            let tdxObj = {
                id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a1",
                title: "TDX Assessment",
                usagetype: "Quiz"
            }
            let componentTdx = mount(<Provider store={store}><AssessmentSlateCanvas {...props} model={assessmentSlateTDX} /></Provider>)
            let tdxInstance = componentTdx.find('AssessmentSlateCanvas').instance();
            jest.spyOn(tdxInstance, 'addCiteTdxAssessment')
            tdxInstance.addCiteTdxAssessment(tdxObj, 'tdx');
            expect(tdxInstance.state.assessmentFormat).toEqual('tdx');
            expect(tdxInstance.state.getAssessmentData).toEqual(true);
            expect(tdxInstance.state.getAssessmentDataPopup).toEqual(true);
            expect(tdxInstance.addCiteTdxAssessment).toHaveBeenCalledWith(tdxObj, 'tdx');
        });
    })
});
