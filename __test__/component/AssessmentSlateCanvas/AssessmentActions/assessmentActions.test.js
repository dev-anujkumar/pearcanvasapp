
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

describe('Assessment Actions- fetchUsageTypeData', () => {
    it('testing---fetchUsageTypeData-Then', () => {
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
    it('testing---fetchUsageTypeData-Catch', () => {
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
