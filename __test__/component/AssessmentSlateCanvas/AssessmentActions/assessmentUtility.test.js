/**************************Import Plugins**************************/
import React from 'react';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import * as assessment_UtiltyFn from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
/*************************Import Constants*************************/
import { MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';

/**************************Mock Helper Functions**************************/
jest.mock('../../../../src/appstore/store.js', () => {
    return {
        getState: () => {
            return {
                appStore: {
                    usageTypeListData: {
                        usageTypeList: MockUsageTypeList_Data
                    }
                }
            }
        }
    }
})
jest.mock('../../../../src/constants/utility.js', () => {
    return {
        hasReviewerRole: () => {
            return false
        }
    }
})

describe('Test---Assessment Utility Functions', () => {
    describe('Test 1---setAssessmentTitle Function', () => {
        it('Test 1.1---setAssessmentTitle- Default', () => {
            let model = {
                type: "figure",
                figuredata: {
                    elementdata: {}
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            spyFunction.mockClear();
        });
        it('Test 1.2---setAssessmentTitle- html.title present', () => {
            let model = {
                type: "element-assessment",
                html: {
                    title: 'Title Present'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Title Present');
            spyFunction.mockClear();
        });
        it('Test 1.3---setAssessmentTitle- html.title not present', () => {
            let model = {
                type: "figure",
                title: {
                    text: 'Title Text'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentTitle');
            assessment_UtiltyFn.setAssessmentTitle(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Title Text');
            spyFunction.mockClear();
        });
    });
    describe('Test 2---setAssessmentUsageType Function', () => {
        it('Test 2.1---setAssessmentUsageType- Default', () => {
            let model = {
                type: "figure",
                figuredata: {
                    elementdata: {}
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Quiz');
            spyFunction.mockClear();
        });
        it('Test 2.2---setAssessmentUsageType- Assessment_Slate', () => {
            let model = {
                type: "element-assessment",
                elementdata: {
                    usagetype: 'Homework'
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Homework');
            spyFunction.mockClear();
        });
        it('Test 2.3---setAssessmentUsageType- Single_Assessment', () => {
            let model = {
                type: "figure",
                figuretype: "assessment",
                figuredata: {
                    elementdata: {
                        usagetype: 'Journal'
                    }
                }
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentUsageType');
            assessment_UtiltyFn.setAssessmentUsageType(model);
            expect(spyFunction).toHaveBeenCalledWith(model);
            expect(spyFunction).toHaveReturnedWith('Journal');
            spyFunction.mockClear();
        });
    });
    describe('Test 3---setAssessmentProperties Function', () => {
        it('Test 3.1---setAssessmentProperties- Default/CITE', () => {
            let elementType = "cite"
            let assessmentClasses = {
                divMainClass: 'divAssessmentItem',
                divInnerClass: 'assessmentItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.2---setAssessmentProperties- Default/TDX', () => {
            let elementType = "tdx"
            let assessmentClasses = {
                divMainClass: 'divTdxAssessmentItem',
                divInnerClass: 'tdxAssessmentItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.3---setAssessmentProperties- Default/PUF', () => {
            let elementType = "puf"
            let assessmentClasses = {
                divMainClass: 'divPUFItem',
                divInnerClass: 'pufItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
        it('Test 3.4---setAssessmentProperties- Default/LEARNOSITY', () => {
            let elementType = "learnosity"
            let assessmentClasses = {
                divMainClass: 'divLearnosityItem',
                divInnerClass: 'learnosityItem'
            }
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setAssessmentProperties');
            assessment_UtiltyFn.setAssessmentProperties(elementType);
            expect(spyFunction).toHaveBeenCalledWith(elementType);
            spyFunction.mockClear();
        });
    });
    describe('Test 4---setUsageTypeDropdown Function', () => {
        const clickHandlerFn = jest.fn();
        it('Test 4.1---setUsageTypeDropdown- Single_Assessment', () => {
            config.slateType === "section"
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setUsageTypeDropdown');
            assessment_UtiltyFn.setUsageTypeDropdown(clickHandlerFn);
            expect(spyFunction).toHaveBeenCalledWith(clickHandlerFn);
            spyFunction.mockClear();
        });
        it('Test 4.2---setUsageTypeDropdown- Assessment_Slate', () => {
            config.slateType === "assessment"
            const spyFunction = jest.spyOn(assessment_UtiltyFn, 'setUsageTypeDropdown');
            assessment_UtiltyFn.setUsageTypeDropdown(clickHandlerFn);
            expect(spyFunction).toHaveBeenCalledWith(clickHandlerFn);
            spyFunction.mockClear();
        });

    });
});
