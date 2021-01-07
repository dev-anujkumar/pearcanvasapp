
/**************************Import Plugins**************************/
import React from 'react';
import axios from 'axios';
/**************************Import Modules**************************/
import config from '../../../../src/config/config';
import * as assessment_Actions from '../../../../src/component/AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
/*************************Import Constants*************************/
import { GET_USAGE_TYPE, ELM_PORTAL_API_ERROR, SET_ASSESSMENT_METADATA, UPDATE_ELM_ITEM_ID } from "../../../../src/constants/Action_Constants";
import { usageTypeAPI_Data, MockUsageTypeList_Data } from '../../../../fixtures/AssessmentSlateCanvasTestingData.js';
jest.mock('axios');
jest.mock('../../../../src/component/ElementContainer/AssessmentEventHandling.js', () => ({
    handleRefreshSlate: jest.fn()
})
)

config.AUDIO_NARRATION_URL = 'https://contentapis-staging.pearsoncms.net/structure-api/';
config.ELM_PORTAL_URL = "https://assessmentauthoring-dev.pearson.com"
config.ASSESSMENT_ENDPOINT = "https://contentapis-staging.pearsoncms.net/assessment-api/"
config.SLATE_REFRESH_URL = "https://contentapis-staging.pearsoncms.net/structure-api/container/v2/"
describe('-----------------Testing Assessment Actions-----------------', () => {
    describe('Test-1----------------- fetchUsageTypeData-----------------', () => {
        it('Test-1.1---fetchUsageTypeData-Then- with res.data', () => {
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
        it('Test-1.2---fetchUsageTypeData-Then- without res.data', () => {
            let entityType = "assessment";
            let responseData = {
                data: []
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
        it('Test-1.3---fetchUsageTypeData-Catch', () => {
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
    describe('Test-2----------------- fetchAssessmentMetadata-----------------', () => {
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
        it('Test-2.1---fetchAssessmentMetadata-Then - assessment - calledFrom = "fromNextVersion', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let responseData = {
                data: { ...expectedResponse, name: "", defaultTitle: "" }
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
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromNextVersion', { targetId: workUrn }, {})(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-2.2---fetchAssessmentMetadata-Then - assessment - calledFrom = "fromUpdate', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let responseData = {
                data: { ...expectedResponse, name: "" }
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
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromUpdate', { targetId: workUrn }, {})(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-2.3---fetchAssessmentMetadata-Then - assessment - calledFrom = "fromFetchSlate"', () => {
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
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromFetchSlate', { targetId: workUrn }, {})(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.4---fetchAssessmentMetadata-Then - assessment - calledFrom = "fromElementContainer"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/final"
            let responseData = {
                data: expectedResponse
            }
            let itemData = {
                itemId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                parentId: workUrn,
                targetItemid: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
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
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromElementContainer', { targetId: workUrn }, itemData)(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.5---fetchAssessmentMetadata-Then - assessment - calledFrom = "fromAddElm"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/final"
            let responseData = {
                data: {
                    ...expectedResponse,
                    status: 'approved'
                }
            }
            let itemData = {
                itemId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                parentId: workUrn,
                targetItemid: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
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
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload).toEqual(expectedPayload);
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromAddElm', { targetId: workUrn }, itemData)(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.6---fetchAssessmentMetadata-Then - assessmentItem - calledFrom = "fromGetItemId"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/wip";
            let itemData = {
                itemId: workUrn,
                parentId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                targetItemid: workUrn,
            }
            let responseData = {
                data: expectedResponse
            }
            let dispatch = (obj) => {
                expect(typeof obj).toBe('function');
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessmentItem', 'fromGetItem', { targetId: workUrn }, itemData)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.7---fetchAssessmentMetadata-Then - assessmentItem - calledFrom = "fromItemUpdate"', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            expectedResponse.status = "https://schema.pearson.com/ns/contentlifecyclestatus/wip";
            let itemData = {
                itemId: workUrn,
                parentId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                targetItemid: workUrn,
            }
            let responseData = {
                data: { ...expectedResponse, name: "" }
            }
            let dispatch = (obj) => {
                console.log('disaptch ovj', obj)
                // expect(typeof obj).toBe('function');
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessmentItem', 'fromItemUpdate', { targetId: workUrn }, itemData)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.8---fetchAssessmentMetadata-Then-Switch assessmentArray', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = () => { };
            let responseData = {
                data: expectedResponse
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentMetadata('assessmentArray', 'fromCheckEntityUrn', { targetId: workUrn, "errorMessage": "error" }, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-2.9---fetchAssessmentMetadata-Then-Switch default', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve({ data: { status: "202" } }));
            assessment_Actions.fetchAssessmentMetadata('xyz', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {})(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('xyz', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {});
            spyFunction.mockClear();
        });
        it('Test-2.10---fetchAssessmentMetadata-Then-no status key', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve({ data: {} }));
            assessment_Actions.fetchAssessmentMetadata('xyz', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {})(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('xyz', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {});
            spyFunction.mockClear();

        });
        it('Test-2.11---fetchAssessmentMetadata-Catch', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchAssessmentMetadata('assessment', 'fromAssessmentSlate', { targetId: workUrn }, {})(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('assessment', 'fromAssessmentSlate', { targetId: workUrn }, {});
            spyFunction.mockClear();
        });
        it('Test-2.12---fetchAssessmentMetadata-Catch-2', () => {
            let workUrn = "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb";
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchAssessmentMetadata('assessmentArray', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {})(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('assessmentArray', 'fromAssessmentSlate', { targetId: workUrn, "errorMessage": "error" }, {});
            spyFunction.mockClear();
        });
    });
    describe('Test-3----------------- fetchAssessmentVersions-----------------', () => {
        it('Test-3.1---fetchAssessmentVersions-Then - type = assessmentItem - Case 1', () => {
            jest.mock('../../../../src/appstore/store.js', () => ({
                getState: () => {
                    return {
                        assessmentReducer: {
                            itemUpdateEvent: true,
                            latestItemAssessment: {
                                updatedItem: {
                                    oldItemId: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                                    latestItemTitle: "title"
                                }
                            }
                        }
                    }
                }
            })
            )
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
            let itemData = {
                itemId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                parentId: workUrn,
                targetItemid: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                updatedItem: {
                    oldItemId: workUrn,
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    latestItemTitle: "title"
                }
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                items: [
                    {
                        oldItemId: workUrn,
                        latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                        latestItemTitle: "title"
                    }
                ]
            }
            let dispatch = (obj) => {
                if (obj.type == UPDATE_ELM_ITEM_ID) {
                    expect(obj.type).toBe(UPDATE_ELM_ITEM_ID);
                    expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb");
                } else if (obj.type == 'SET_ITEM_UPDATE_EVENT') {
                    expect(obj.payload).toEqual(true);
                }
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentItem', "2020-10-05T09:40:11.769Z", oldReducerData, itemData)(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-3.2---fetchAssessmentVersions-Then - type = assessmentItem - Case 2', () => {
            jest.mock('../../../../src/appstore/store.js', () => ({
                getState: () => {
                    return {
                        assessmentReducer: {
                            itemUpdateEvent: false,
                            latestItemAssessment: undefined
                        }
                    }
                }
            })
            )
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
            let itemData = {
                itemId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                parentId: workUrn,
                targetItemid: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                updatedItem: {
                    oldItemId: workUrn,
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    latestItemTitle: "title"
                }
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                items: [
                    {
                        oldItemId: workUrn,
                        latestItemId: workUrn,
                        latestItemTitle: "title"
                    }
                ]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(UPDATE_ELM_ITEM_ID);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentItem', "2020-10-05T09:40:11.769Z", oldReducerData, itemData)(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-3.3---fetchAssessmentVersions-Then - type = assessmentItem - Case 3', () => {
            jest.mock('../../../../src/appstore/store.js', () => ({
                getState: () => {
                    return {
                        assessmentReducer: {
                            itemUpdateEvent: false,
                            latestItemAssessment: undefined
                        }
                    }
                }
            })
            )
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let workUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }]
            }
            let itemData = {
                itemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                parentId: workUrn,
                targetItemid: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631bea",
                updatedItem: {
                    oldItemId: workUrn,
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    latestItemTitle: "title"
                }
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb",
                items: [
                    {
                        oldItemId: workUrn,
                        latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                        latestItemTitle: "title"
                    }
                ]
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(UPDATE_ELM_ITEM_ID);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:a5cdf7e1-d65c-4be0-9827-1f396e631beb");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentItem', "2020-10-05T09:40:11.769Z", oldReducerData, itemData)(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-3.4---fetchAssessmentVersions-Then - type = assessment - newVersions.length = 0', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }]
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessment', "2020-10-05T09:40:11.769Z", oldReducerData, {})(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-3.5---fetchAssessmentVersions-Then - type = assessment - newVersions.length = 1', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }]
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            const spyFunction2 = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessment', "2020-08-18T11:05:27.169Z", oldReducerData, {})(dispatch)
            spyFunction2.mockImplementationOnce(() => { return true; })
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-3.6---fetchAssessmentVersions-Then - type = assessment - newVersions.length > 1', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-11-05T09:40:11.769Z"
                },
                {
                    "versionUrn": "urn:pearson:work:ae9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                    "createdDate": "2020-10-05T09:50:11.769Z"
                }
                ]
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_ASSESSMENT_METADATA);
                expect(obj.payload.currentWorkUrn).toEqual("urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af");
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessment', "2020-10-05T09:40:11.769Z", oldReducerData, {})(dispatch)
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-3.7---fetchAssessmentVersions-Then - type = assessmentUpdate-If', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8b6",
                    "createdDate": "2020-11-05T09:41:11.769Z"
                }
                ]
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
            }
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentUpdate', "2020-08-18T11:05:27.169Z", oldReducerData, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-3.8---fetchAssessmentVersions-Then - type = assessmentUpdate-Else', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }]
            }
            let oldReducerData = {
                createdDate: "2020-10-05T09:40:11.769Z",
                activeWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                assessmentTitle: "title1",
                showUpdateStatus: false,
                assessmentStatus: "final",
                assessmentEntityUrn: entityUrn,
                targetId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
            }
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentUpdate', "2020-10-05T09:40:11.769Z", oldReducerData, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-3.9---fetchAssessmentVersions-Then - Switch default', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: [{
                    "versionUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                    "createdDate": "2020-08-18T11:05:27.169Z"
                }, {
                    "versionUrn": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    "createdDate": "2020-10-05T09:40:11.769Z"
                }]
            }
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentArray', "2020-10-01T10:23:30.130Z", {}, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-3.10---fetchAssessmentVersions-Then - false -> response.data length > 0', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let responseData = {
                data: []
            }
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessmentArray', "2020-10-01T10:23:30.130Z", {}, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();

        });
        it('Test-3.11---fetchAssessmentVersions-Catch', () => {
            let entityUrn = "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86";
            let dispatch = () => { }
            const spyFunction = jest.spyOn(assessment_Actions, 'fetchAssessmentVersions');
            axios.get = jest.fn(() => Promise.reject({}));
            assessment_Actions.fetchAssessmentVersions(entityUrn, 'assessment', "2020-10-01T10:23:30.130Z", {}, {})(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-4----------------- openElmAssessmentPortal-----------------', () => {
        it('Test-4.1---openElmAssessmentPortal-Then IF', () => {
            const spyFunction = jest.spyOn(assessment_Actions, 'openElmAssessmentPortal');
            const mockedOpen = () => {
                return {
                    closed: true
                }
            };
            const originalWindow = { ...window };
            const windowSpy = jest.spyOn(global, "window", "get");
            windowSpy.mockImplementation(() => ({
                ...originalWindow,
                open: mockedOpen,
                closed: true
            }));
            let dispatch = jest.fn();
            assessment_Actions.openElmAssessmentPortal({
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
            const mockedOpen = () => {
                return {}
            };
            const windowSpy = jest.spyOn(global, "window", "get");
            windowSpy.mockImplementation(() => ({
                open: mockedOpen
            }));
            let dispatch = jest.fn();
            assessment_Actions.openElmAssessmentPortal({
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
                if (obj.type === 'ASSESSMENT_CONFIRMATION_POPUP') {
                    expect(obj.type).toBe('ASSESSMENT_CONFIRMATION_POPUP');
                    expect(obj.payload).toEqual(true);
                } else {
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
        it('Test-5.2---updateAssessmentVersion-Then-2', () => {
            let oldWorkUrn = "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af"
            let updatedWorkUrn = "urn:pearson:work:9db703b9-4e21-4dac-968e-baf9323467af"
            let response = {
                data: { status: "200" },
                status: 200
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'updateAssessmentVersion');
            axios.post = jest.fn(() => Promise.reject(response));
            assessment_Actions.updateAssessmentVersion(oldWorkUrn, updatedWorkUrn);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-5.3---updateAssessmentVersion-Catch', async () => {
            let assessmentData = {
                assessmentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                projDURN: "urn:pearson:distributable:8f1ceb41-da2c-4fc1-896d-fc4d2566fa0b",
                containerURN: "urn:pearson:manifest:bd47b002-d949-4a60-948d-e9c652c297e0",
                assessmentItemWorkUrn: ""
            }
            let dispatch = (obj) => {
                if (obj.type == ELM_PORTAL_API_ERROR) {
                    expect(obj.type).toBe(ELM_PORTAL_API_ERROR);
                    expect(obj.payload.showError).toEqual(true);
                    expect(obj.payload.errorMessage).toEqual('Unable to Update Other Instances of this Assessment in the Project');
                    expect(obj.payload.isElmApiError).toEqual('elm-api-error');
                } else {
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
            let dispatch = (selector) => {
                if (typeof (selector) == 'function') {
                    return expectedResponse.entityUrn
                }
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'checkEntityUrn');
            const spyFunction2 = jest.spyOn(assessment_Actions, 'fetchAssessmentMetadata');
            axios.post = jest.fn(() => Promise.resolve(responseData));
            spyFunction2.mockImplementation(() => {
                return expectedResponse.entityUrn
            })
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
        const elmAssessmentId = "mainId";
        const elmAssessmentItemId = "itemId";
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
        it('Test-7.3---editElmAssessmentId', () => {
            let result = assessment_Actions.editElmAssessmentId(elmAssessmentId, elmAssessmentItemId);
            expect(result.type).toEqual('ELM_ASSESSMENT_EDIT_ID');
            expect(result.payload).toEqual({ currentEditAssessment: { elmAssessmentId, elmAssessmentItemId } });
        });
        it('Test-7.4---updateElmItemData', () => {
            const editItem = {
                elmAssessmentId, elmAssessmentItemId
            }
            const itemData = {
                itemId: "itemId",
                itemTitle: "itemtitle"
            }
            let payload = {
                currentWorkUrn: editItem.elmAssessmentId,
                updatedItem: {
                    oldItemId: editItem.elmAssessmentItemId,
                    latestItemId: itemData.itemId,
                    latestItemTitle: itemData.itemTitle
                }
            }
            const spyFunction = jest.spyOn(assessment_Actions, 'updateElmItemData');
            let result = assessment_Actions.updateElmItemData(editItem, itemData);
            expect(result.type).toEqual('ELM_ITEM_EVENT_DATA');
            expect(result.payload).toEqual(payload);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-7.4---setItemUpdateEvent', () => {
            const spyFunction = jest.spyOn(assessment_Actions, 'setItemUpdateEvent');
            let result = assessment_Actions.setItemUpdateEvent(true);
            expect(result.type).toEqual('SET_ITEM_UPDATE_EVENT');
            expect(result.payload).toEqual(true);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    })
})
