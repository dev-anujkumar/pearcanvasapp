const INITIAL_STATE = {}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function reducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
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