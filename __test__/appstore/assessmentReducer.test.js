import reducer from '../../src/appstore/assessmentReducer';

import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_METADATA,
    RESET_ASSESSMENT_STORE,
    UPDATE_ELM_ITEM_ID,
    SAVE_AUTO_UPDATE_ID,
    ELM_ITEM_EVENT_DATA,
    SET_ITEM_UPDATE_EVENT,
    ELM_ASSESSMENT_EDIT_ID,
    ASSESSMENT_CONFIRMATION_POPUP,
    ELM_NEW_ITEM_DATA
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData: {},
    currentEditAssessment: {},
    itemUpdateEvent: false
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

let payload1 = {
    currentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
    dataForUpdate: {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86"
    }
}
let expectedState1 = {
    usageTypeListData: {},
    currentEditAssessment: {},
    itemUpdateEvent: false,
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86"
    }
}
let expectedState2 = {
    usageTypeListData: {},
    currentEditAssessment: {},
    itemUpdateEvent: false,
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        latestWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6"
    }
}
let expectedState3 = {
    entityType: 'assessment',
    usageTypeList: ["Concept Check", "Diagnostic", "Homework", "Journal", "Non Scored", "Practice", "Quiz", "Remediation", "Shared Writing", "Study Tools", "Test"],
    apiStatus: 200
}
let expectedState4 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        items: [
            {
                oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a1",
                latestItemTitle: 'item-title'
            }
        ]
    },
    currentEditAssessment: {},
    itemUpdateEvent: false
}
let expectedState5 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        items: [
            {
                oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a3",
                latestItemTitle: 'item-title'
            }
        ]
    },
    currentEditAssessment: {},
    itemUpdateEvent: false
}
let expectedState6 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        //latestWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6"
    },
    currentEditAssessment: {
        elmAssessmentId: "main-id",
        elmAssessmentItemId: "item-id"
    },
    "itemUpdateEvent": false
}
let expectedState7 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        // latestWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
    },
    currentEditAssessment: {
        elmAssessmentId: "main-id",
        elmAssessmentItemId: "item-id"
    },
    latestItemAssessment: {
        "currentWorkUrn": "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        "updatedItem": {
            "latestItemId": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a3",
            "latestItemTitle": "item-title",
            "oldItemId": "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
        }
    }
}
const intitalState6 = {
    ...INITIAL_STATE,
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        items: []
    },
}
const expectedState8 = {
    ...INITIAL_STATE,
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        items: [
            {
                oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                latestItemTitle: 'item-title'
            }
        ]
    },
}
const intitalState7 = {
    ...INITIAL_STATE,
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        assessmentEntityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        items: [
            {
                oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a3",
                latestItemTitle: 'item-title'
            }
        ]
    },
}
describe('Test AssessmentReducer', () => {

    it('Test Initial State', () => {
        expect(reducer(INITIAL_STATE)).toEqual(INITIAL_STATE);
    });
    it('GET_USAGE_TYPE', () => {
        expect(reducer(INITIAL_STATE, {
            type: GET_USAGE_TYPE,
            payload: expectedState3
        })).toEqual({
            usageTypeListData: {},
            currentEditAssessment: {},
            itemUpdateEvent: false
        })
    })
    it('SET_ASSESSMENT_METADATA', () => {
        expect(reducer(INITIAL_STATE, {
            type: SET_ASSESSMENT_METADATA,
            payload: payload1
        })).toEqual({ usageTypeListData: {}, ...expectedState1 })
    })
    it('RESET_ASSESSMENT_STORE', () => {
        expect(reducer(INITIAL_STATE, {
            type: RESET_ASSESSMENT_STORE,
            payload: {}
        })).toEqual({
            "currentEditAssessment": {},
            "itemUpdateEvent": false,
            "latestItemAssessment": undefined,
        })
    })
    it('ASSESSMENT_CONFIRMATION_POPUP', () => {
        expect(reducer({ usageTypeListData: {} }, {
            type: ASSESSMENT_CONFIRMATION_POPUP,
            payload: true
        })).toEqual({ usageTypeListData: {}, showConfirmationPopup: true })
    })
    it('ELM_ASSESSMENT_EDIT_ID', () => {
        expect(reducer({ usageTypeListData: {}, ...expectedState1 }, {
            type: ELM_ASSESSMENT_EDIT_ID,
            payload: {
                currentEditAssessment: {
                    elmAssessmentId: "main-id",
                    elmAssessmentItemId: "item-id"
                }
            }
        })).toEqual(expectedState6)
    })
    it('SET_ITEM_UPDATE_EVENT', () => {
        expect(reducer({ usageTypeListData: {}, ...expectedState1 }, {
            type: SET_ITEM_UPDATE_EVENT,
            payload: false
        }
        )).toEqual({ ...expectedState6, "currentEditAssessment": {} })
    })
    it('ELM_ITEM_EVENT_DATA', () => {
        expect(reducer({ usageTypeListData: {}, ...expectedState1 }, {
            type: ELM_ITEM_EVENT_DATA,
            payload: {
                currentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                updatedItem: {
                    oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a3",
                    latestItemTitle: "item-title"
                }
            }
        }
        )).toEqual({
            ...expectedState7, currentEditAssessment: {},
            itemUpdateEvent: false
        })
    })
    it('UPDATE_ELM_ITEM_ID-IF', () => {
        expect(reducer(intitalState6, {
            type: UPDATE_ELM_ITEM_ID,
            payload: {
                currentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                updatedItem: {
                    oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    latestItemTitle: 'item-title'
                }
            }
        })).toEqual(expectedState8)
    })
    it('UPDATE_ELM_ITEM_ID-ELSE', () => {
        expect(reducer(intitalState7, {
            type: UPDATE_ELM_ITEM_ID,
            payload: {
                currentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                updatedItem: {
                    oldItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a2",
                    latestItemId: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6",
                    latestItemTitle: 'item-title'
                }
            }
        })).toEqual(expectedState8)
    })
    it('SAVE_AUTO_UPDATE_ID', () => {
        expect(reducer(INITIAL_STATE, {
            type: SAVE_AUTO_UPDATE_ID,
            payload: {
                oldAssessmentId: 'oldId',
                newAssessmentId: 'newId'
            }
        }
        )).toEqual({
            ...INITIAL_STATE, saveAutoUpdateData: {
                oldAssessmentId: 'oldId',
                newAssessmentId: 'newId'
            }
        })
    })
    it('ELM_NEW_ITEM_DATA', () => {
        expect(reducer(INITIAL_STATE, {
            type: ELM_NEW_ITEM_DATA,
            payload: {
                source:"elm",
                type:"item",
                timeStamp:"3847238923"
            }
        }
        )).toEqual({
            ...INITIAL_STATE, item: {
                    source:"elm",
                    type:"item",
                    timeStamp:"3847238923"
            }
        })
    })
});