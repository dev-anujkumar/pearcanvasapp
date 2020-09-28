import {     
    GET_USAGE_TYPE,
    SET_ASSESSMENT_STATUS,
    GET_ASSESSMENT_METADATA,
    GET_ASSESSMENT_VERSIONS
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    usageTypeListData:{},
    assessmentStatus:"",
    entityUrn:"",
    activeWorkUrn:"",
    latestWorkUrn:""
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
            return {
                ...state,
                assessmentStatus: action.payload.assessmentStatus
            }
        case GET_ASSESSMENT_METADATA:
            return {
                ...state,
                entityUrn: action.payload.entityUrn,
                activeWorkUrn: action.payload.activeWorkUrn
            }
        case GET_ASSESSMENT_VERSIONS:
            return {
                ...state,
                latestWorkUrn: action.payload.latestWorkUrn
            }
        case RESET_ASSESSMENT_STORE:
            return {
                ...state,
                entityUrn: "",
                activeWorkUrn: "",
                latestWorkUrn: "",
                assessmentStatus: ""
            }
        default:
            return state
    }
}