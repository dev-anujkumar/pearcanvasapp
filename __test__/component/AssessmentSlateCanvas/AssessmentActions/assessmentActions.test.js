
/**************************Import Plugins**************************/
import React from 'react';
import axios from 'axios';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import * as assessment_Actions from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
/*************************Import Constants*************************/
import { GET_USAGE_TYPE, ELM_PORTAL_API_ERROR, GET_ASSESSMENT_VERSIONS, SET_ASSESSMENT_STATUS, UPDATE_ELM_ITEM_ID } from "../../../../src/constants/Action_Constants";
import { usageTypeAPI_Data, MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';
jest.mock('axios');
config.AUDIO_NARRATION_URL = 'https://contentapis-staging.pearsoncms.net/structure-api/';
config.ELM_PORTAL_URL = "https://assessmentauthoring-dev.pearson.com"
config.ASSESSMENT_ENDPOINT = "https://contentapis-staging.pearsoncms.net/assessment-api/"
config.SLATE_REFRESH_URL = "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/"
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
        it('Test-2.4---checkAssessmentStatus-Then - calledFrom = "fromGetItemId"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/wip";
            let itemData = {
                itemId: workUrn,
                parentId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                type: 'assessment-item',
            }
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
            assessment_Actions.checkAssessmentStatus(workUrn, 'fromGetItemId',"","",itemData)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.5---checkAssessmentStatus-Catch', () => {
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
        it('Test-1.2---getLatestAssessmentVersion-Then - newVersions.length > 1', () => {
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
        it('Test-1.3---getLatestAssessmentVersion-Then - type = assessment-item', () => {
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
            let updatedItem = {
                oldItemId: workUrn,
                latestItemId : "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6"
            }
            let previousData= {
                currentWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb"
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(UPDATE_ELM_ITEM_ID);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb");
                expect(obj.payload.updatedItem).toEqual(updatedItem);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'getLatestAssessmentVersion');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.getLatestAssessmentVersion(entityUrn, workUrn, "2020-08-18T11:05:27.169Z",previousData, 'assessment-item')(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-1.4---getLatestAssessmentVersion-Catch', () => {
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
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            const mockedOpen = ()=>{
                return {
                    closed:true
                }
            };
            const originalWindow = { ...window };
            const windowSpy = jest.spyOn(global, "window", "get");
            windowSpy.mockImplementation(() => ({
              ...originalWindow,
              open: mockedOpen,
              closed:true
            }));
            let dispatch = jest.fn();
            assessment_Actions.openElmAssessmentPortal( {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467ag"
            })(dispatch);
            windowSpy.mockRestore();            
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-4.2---openElmAssessmentPortal-Then ELSE', () => {
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            const mockedOpen = ()=>{
                return {}
            };
            const windowSpy = jest.spyOn(global, "window", "get");
            windowSpy.mockImplementation(() => ({
              open: mockedOpen
            }));
            let dispatch = jest.fn();
            assessment_Actions.openElmAssessmentPortal( {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: ""
            })(dispatch);
            windowSpy.mockRestore();  
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
    describe('Test-5----------------- updateAssessmentVersion-----------------', () => {
        it('Test-5.1---updateAssessmentVersion-Then', () => {
            let oldWorkUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af"
            let updatedWorkUrn = "urn:pearson:work:9db703b9-4e21-4dac-968e-baf9323467af"
            let responseData = {
                data: { status: "202" },
                status: 202
            }
            let dispatch = (obj) => {
                if(obj.type==='ASSESSMENT_CONFIRMATION_POPUP'){
                    expect(obj.type).toBe('ASSESSMENT_CONFIRMATION_POPUP');
                    expect(obj.payload).toEqual(true);
                }else {
                    expect(obj.type).toBe('SAVE_AUTO_UPDATE_ID');
                    expect(obj.payload.oldAssessmentId).toEqual("");
                    expect(obj.payload.newAssessmentId).toEqual("");
                }

            }
            const spyFunction = jest.spyOn(assessment_Actions, 'updateAssessmentVersion');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.updateAssessmentVersion(oldWorkUrn, updatedWorkUrn)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-5.2---updateAssessmentVersion-Catch', async () => {
            let assessmentData = {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: ""
            }
            let dispatch = (obj) => {
                if(obj.type == ELM_PORTAL_API_ERROR){
                    expect(obj.type).toBe(ELM_PORTAL_API_ERROR);
                    expect(obj.payload.showError).toEqual(true);
                    expect(obj.payload.errorMessage).toEqual('Unable to Update Other Instances of this Assessment in the Project');
                    expect(obj.payload.isElmApiError).toEqual('elm-api-error');
                }else {
                    expect(obj.type).toBe('SAVE_AUTO_UPDATE_ID');
                }
               
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'updateAssessmentVersion');
            axios.post = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
            assessment_Actions.updateAssessmentVersion(assessmentData)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        }); 
    });
    describe('Test-6----------------- checkEntityUrn-----------------', () => {
        let expectedResponse = {
            "versionUrn": "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
            "entityUrn": "urn:pearson:entity:b18ba4aa-3e2b-4650-8bd6-3ae70bd17c07",
            "status": "https://schema.pearson.com/ns/contentlifecyclestatus/wip"
        }
        let assessmentID = ["urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
            "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb"
        ]
        it('Test-6.1---checkEntityUrn-Then', () => {
            let responseData = {
                data: expectedResponse
            }
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkEntityUrn');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.checkEntityUrn(assessmentID)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-6.2---checkEntityUrn-Catch', async () => {
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkEntityUrn');
            axios.post = await jest.fn().mockImplementationOnce(() => Promise.reject({}));
            assessment_Actions.checkEntityUrn(assessmentID)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-7----------------- Other Actions-----------------', () => {
        it('Test-7.1---resetAssessmentStore', () => {
            const spyFunction = jest.spyOn(assessment_Actions, 'resetAssessmentStore');
            let result = assessment_Actions.resetAssessmentStore();
            expect(result.type).toEqual('RESET_ASSESSMENT_STORE');
            expect(result.payload).toEqual({});
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-7.2---assessmentConfirmationPopup', () => {
            const spyFunction = jest.spyOn(assessment_Actions, 'assessmentConfirmationPopup');
            let result = assessment_Actions.assessmentConfirmationPopup(true);
            expect(result.type).toEqual('ASSESSMENT_CONFIRMATION_POPUP');
            expect(result.payload).toEqual(true);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        
    })
})
