const INITIAL_STATE = {
    isLoading:true
}

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
        case 'GET_ELM_ITEMS':
            return {
                ...state,
                elmItemData: action.payload.data,
                itemErrorFlag: action.payload.errFlag,
                itemApiStatus: action.payload.apiStatus,
                isLoading: action.payload.isLoading
            }
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        default:
            return state
    }
}