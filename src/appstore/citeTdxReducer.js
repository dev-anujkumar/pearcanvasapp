const INITIAL_STATE = {
    citeData: [],
    tdxData: [],
    mmiData: [],
    assessmenterrFlag: false,
    isLoading: true,
    currentAssessmentSelected:{}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function reducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch(action.type){
        case 'GET_CITE_RESOURCES' :
            return {
               ...state,
               citeData : action.payload.data,
               assessmenterrFlag : action.payload.errFlag,
               isLoading: action.payload.isLoading
            }
        case 'GET_TDX_RESOURCES' :
            return {
               ...state,
               tdxData : action.payload.data,
               assessmenterrFlag : action.payload.errFlag,
               isLoading: action.payload.isLoading
            }
        case 'GET_MMI_RESOURCES' :
            return {
                ...state,
                mmiData : action.payload.data,
                assessmenterrFlag : action.payload.errFlag,
                isLoading: action.payload.isLoading
            }
        case 'SET_LOADING_TRUE' :
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case "CURRENT_SELECTED_ASSESSMENT": {
                return {
                    ...state,
                    currentAssessmentSelected: action.payload
                }
        }
        default:
            return state
    }
}