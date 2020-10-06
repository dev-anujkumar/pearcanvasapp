import {
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_METADATA,
    GET_ASSESSMENT_VERSIONS,
    RESET_ASSESSMENT_STORE
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData: {},
    assessmentStatus: "",
    entityUrn: "",
    activeWorkUrn: "",
    latestWorkUrn: "",
    latestAssessmentTitle: "",

}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function assessmentReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case GET_USAGE_TYPE:
            return {
                ...state,
                usageTypeListData: action.payload
            }
        case SET_ASSESSMENT_STATUS:
            console.log('action.payload', action.payload)
            return {
                ...state,
                ... action.payload
            }
        case GET_ASSESSMENT_METADATA:
            return {
                ...state,
                ...action.payload,
                entityUrn: action.payload.entityUrn,
                activeWorkUrn: action.payload.activeWorkUrn,
                latestAssessmentTitle: action.payload.assessmentTitle
            }
        case GET_ASSESSMENT_VERSIONS:
            return {
                ...state,
                [action.payload.currentWorkUrn]: {
                    ...state[action.payload.currentWorkUrn],
                    latestWorkUrn: action.payload.latestWorkUrn,
                },
            }
        case RESET_ASSESSMENT_STORE:
            return {}
        default:
            return state
    }
}