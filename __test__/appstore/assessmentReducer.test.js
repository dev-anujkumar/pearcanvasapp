import reducer from '../../src/appstore/assessmentReducer';

import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_VERSIONS,
    RESET_ASSESSMENT_STORE
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData: {}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

let expectedState1 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        entityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86"
    }
}
let expectedState2 = {
    usageTypeListData: {},
    "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af": {
        activeWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
        assessmentStatus: "final",
        assessmentTitle: "Quiz: 7.4 Developing Relationships",
        entityUrn: "urn:pearson:entity:c785c0f6-6fc7-4f51-855c-0677738a9d86",
        latestWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6"
    }
}
let expectedState3 = {
    entityType: 'assessment',
    usageTypeList: ["Concept Check", "Diagnostic", "Homework", "Journal", "Non Scored", "Practice", "Quiz", "Remediation", "Shared Writing", "Study Tools", "Test"],
    apiStatus: 200,
}
describe('Test AssessmentReducer', () => {

    it('Test Initial State', () => {
        expect(reducer(undefined, INITIAL_ACTION)).toEqual(INITIAL_STATE);
    });
    it('GET_USAGE_TYPE', () => {
        expect(reducer(INITIAL_STATE, {
            type: GET_USAGE_TYPE,
            payload: expectedState3
        })).toEqual({ usageTypeListData: expectedState3 })
    })
    it('SET_ASSESSMENT_STATUS', () => {
        expect(reducer(INITIAL_STATE, {
            type: SET_ASSESSMENT_STATUS,
            payload: expectedState1
        })).toEqual({ usageTypeListData: {}, ...expectedState1 })
    })
    it('GET_ASSESSMENT_VERSIONS', () => {
        expect(reducer({ usageTypeListData: {}, ...expectedState1 }, {
            type: GET_ASSESSMENT_VERSIONS,
            payload: {
                currentWorkUrn: "urn:pearson:work:8fb703b9-4e21-4dac-968e-baf9323467af",
                latestWorkUrn: "urn:pearson:work:ce9b7d24-fa62-4b1c-9e3f-d08a9dd5b8a6"
            }
        })).toEqual(expectedState2)
    })
    it('RESET_ASSESSMENT_STORE', () => {
        expect(reducer(INITIAL_STATE, {
            type: RESET_ASSESSMENT_STORE,
            payload: {}
        })).toEqual({})
    })
});