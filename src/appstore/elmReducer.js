const INITIAL_STATE = {}

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type){
        case 'GET_ELM_RESOURCES' :
            return {
               ...state,
               elmData : action.payload.data,
               errFlag : action.payload.errFlag,
               apiStatus : action.payload.apiStatus
            }
        default:
            return state
    }
}