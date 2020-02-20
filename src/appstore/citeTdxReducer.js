const INITIAL_STATE = {
    currentAssessmentSelected:{}
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function reducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch(action.type){
        case 'GET_CITE_TDX_RESOURCES' :
            return {
               ...state,
               citeTdxData : action.payload.data,
               assessmenterrFlag : action.payload.errFlag
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