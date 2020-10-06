
/**************************Import Plugins**************************/
import React from 'react';
import axios from 'axios';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import * as assessment_Actions from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
/*************************Import Constants*************************/
import { GET_USAGE_TYPE } from "../../../../src/constants/Action_Constants";
import { usageTypeAPI_Data, MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';

config.AUDIO_NARRATION_URL = 'https://contentapis-staging.pearsoncms.net/structure-api/';

describe('-----------------Testing Assessment Actions-----------------', () => {
    describe('Test-1----------------- fetchUsageTypeData-----------------', () => {
        it('Test-1.1---fetchUsageTypeData-Then', () => {
            let entityType = "assessment";
            let responseData = {
                data: usageTypeAPI_Data
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.2---fetchUsageTypeData-Catch', () => {
            let entityType = "assessment";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(404);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-2----------------- checkAssessmentStatus-----------------', () => {
        it('Test-2.1---checkAssessmentStatus-Then - IF', () => {
            let entityType = "assessment";
            let responseData = {
                data: usageTypeAPI_Data
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-2.2---checkAssessmentStatus-Then - ELSE', () => {
            let entityType = "assessment";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.3---checkAssessmentStatus-Catch', () => {
            let entityType = "assessment";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(404);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-3----------------- getLatestAssessmentVersion-----------------', () => {
        it('Test-1.1---getLatestAssessmentVersion-Then', () => {
            let entityType = "assessment";
            let responseData = {
                data: usageTypeAPI_Data
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.2---getLatestAssessmentVersion-Catch', () => {
            let entityType = "assessment";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(404);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-4----------------- openElmAssessmentPortal-----------------', () => {
        it('Test-4.1---openElmAssessmentPortal-Then', () => {
            let entityType = "assessment";
            let responseData = {
                data: usageTypeAPI_Data
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(200);
                expect(obj.payload.usageTypeList).toEqual(MockUsageTypeList_Data);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-4.2---openElmAssessmentPortal-Catch', () => {
            let entityType = "assessment";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_USAGE_TYPE);
                expect(obj.payload.apiStatus).toEqual(404);
                expect(obj.payload.usageTypeList).toEqual([]);
                expect(obj.payload.entityType).toEqual(entityType);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchUsageTypeData');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchUsageTypeData(entityType)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
})
