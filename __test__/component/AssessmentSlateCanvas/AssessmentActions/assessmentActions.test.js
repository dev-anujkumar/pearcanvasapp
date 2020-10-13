
/**************************Import Plugins**************************/
import React from 'react';
import axios from 'axios';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import * as assessment_Actions from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
/*************************Import Constants*************************/
import { GET_USAGE_TYPE, ELM_PORTAL_API_ERROR, GET_ASSESSMENT_VERSIONS, SET_ASSESSMENT_STATUS } from "../../../../src/constants/Action_Constants";
import { usageTypeAPI_Data, MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';
jest.mock('axios');
config.AUDIO_NARRATION_URL = 'https://contentapis-staging.pearsoncms.net/structure-api/';
config.ELM_PORTAL_URL = "https://assessmentauthoring-dev.pearson.com"
config.ASSESSMENT_ENDPOINT = "https://contentapis-staging.pearsoncms.net/assessment-api/"
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
        let expectedResponse = {
            "versionUrn": "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
            "entityUrn": "urn:pearson:entity:b18ba4aa-3e2b-4650-8bd6-3ae70bd17c07",
            "type": [
                "Work",
                "AssessmentInstrument"
            ],
            "name": "Elm Assessments title is C0A5CT5T5E",
            "status": "https://schema.pearson.com/ns/contentlifecyclestatus/wip",
            "description": "New Test Description.",
            "taxonomicTypes": [
                "puf"
            ],
            "defaultTitle": "Elm Assessments title is C0A5CT5T5E",
            "shortTitle": "Elm Assessments title is C0A5CT5T5E",
            "references": [
                {
                    "sourceSystem": "Elm",
                    "sourceSystemId": "urn:pearson:elm:assessment:integration+A5001AB4+r2",
                    "sourceSystemContextId": "integration"
                }
            ],
            "isVersionOf": [
                "urn:pearson:work:664f6398-135b-41f1-9472-742e976692e6"
            ],
            "createdBy": "SERV.ELM_INTEGRATION",
            "dateCreated": "2020-10-01T10:23:30.130Z",
            "dateModified": "2020-10-01T10:23:30.158Z",
            "_links": {
                "https://api.pearson.com/assessmentapi/relation/metadata": {
                    "method": "PUT",
                    "href": "/assessment/v2/urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb/",
                    "title": "Save metadata"
                }
            },
            "bloomsTaxonomyObjectives": [],
            "additionalMetadata": [
                {
                    "elmAssessmentId": "A5001AB4"
                },
                {
                    "elmRevision": 2
                },
                {
                    "elmVersionIsClean": true
                }
            ],
            "etag": "896474063396"
        }
        it('Test-2.1---checkAssessmentStatus-Then - IF', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let responseData = {
                data: expectedResponse
            }
            let expectedPayload = {
                [workUrn]:
                {
                    assessmentStatus: "wip",
                    entityUrn: "urn:pearson:entity:b18ba4aa-3e2b-4650-8bd6-3ae70bd17c07",
                    activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                    assessmentTitle: "Elm Assessments title is C0A5CT5T5E"
                }
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_STATUS);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkAssessmentStatus');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.checkAssessmentStatus(workUrn, 'fromAssessmentSlate')(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-2.2---checkAssessmentStatus-Then - ELSE', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/final"
            let responseData = {
                data: expectedResponse
            }
            let expectedPayload = {
                [workUrn]:
                {
                    assessmentStatus: "wip",
                    entityUrn: "urn:pearson:entity:b18ba4aa-3e2b-4650-8bd6-3ae70bd17c07",
                    activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                    assessmentTitle: "Elm Assessments title is C0A5CT5T5E"
                }
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_STATUS);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkAssessmentStatus');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.checkAssessmentStatus(workUrn, 'fromAssessmentSlate')(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.3---checkAssessmentStatus-Then - calledFrom = "fromNextVersion"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/final"
            let responseData = {
                data: expectedResponse
            }
            let expectedPayload = {
                [workUrn]:
                {
                    assessmentStatus: "wip",
                    entityUrn: "urn:pearson:entity:b18ba4aa-3e2b-4650-8bd6-3ae70bd17c07",
                    activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                    assessmentTitle: "Elm Assessments title is C0A5CT5T5E"
                }
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_STATUS);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkAssessmentStatus');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.checkAssessmentStatus(workUrn, 'fromNextVersion')(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.4---checkAssessmentStatus-Catch', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_STATUS);
                expect(obj.payload.apiStatus).toEqual({ "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb": { assessmentStatus: "" } });
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkAssessmentStatus');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.checkAssessmentStatus(workUrn, 'fromAssessmentSlate')(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-3----------------- getLatestAssessmentVersion-----------------', () => {
        it('Test-1.1---getLatestAssessmentVersion-Then - newVersions.length == 1', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let workUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ASSESSMENT_VERSIONS);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af");
                expect(obj.payload.latestWorkUrn).toEqual("urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'getLatestAssessmentVersion');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.getLatestAssessmentVersion(entityUrn, workUrn, "2020-08-18T11:05:27.169Z")(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.1---getLatestAssessmentVersion-Then - newVersions.length > 1', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let workUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                },
                {
                    "versionUrn": "urn:pearson:work:ae9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:50:11.769Z"
                }]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ASSESSMENT_VERSIONS);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af");
                expect(obj.payload.latestWorkUrn).toEqual("urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'getLatestAssessmentVersion');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.getLatestAssessmentVersion(entityUrn, workUrn, "2020-08-18T11:05:27.169Z")(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.2---getLatestAssessmentVersion-Catch', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let workUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ASSESSMENT_VERSIONS);
                expect(obj.payload.latestWorkUrn).toEqual("");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'getLatestAssessmentVersion');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.getLatestAssessmentVersion(entityUrn, workUrn)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-4----------------- openElmAssessmentPortal-----------------', () => {
        it('Test-4.1---openElmAssessmentPortal-Then IF', () => {
            let assessmentData = {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: ""
            }
            let responseData = {
                data: { status: "200" }
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            let result = assessment_Actions.openElmAssessmentPortal(assessmentData);
            // expect(result.data.status).toEqual('200');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-4.2---openElmAssessmentPortal-Then ELSE', () => {
            let assessmentData = {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf932346722"
            }
            let responseData = {
                data: { status: "200" }
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            axios.post = jest.fn().mockImplementationOnce(() => Promise.resolve(responseData));
            let result = assessment_Actions.openElmAssessmentPortal(assessmentData);
            // expect(result.data.status).toEqual('200');
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-4.3---openElmAssessmentPortal-Catch', async () => {
            let assessmentData = {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: ""
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(ELM_PORTAL_API_ERROR);
                expect(obj.payload.showError).toEqual(true);
                expect(obj.payload.errorMessage).toEqual("Something went wrong. Please try again!");
                expect(obj.payload.isElmApiError).toEqual('elm-api-error');
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            axios.post = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
            assessment_Actions.openElmAssessmentPortal(assessmentData)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
})
