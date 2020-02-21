const INITIAL_STATE = {
    citeData: [],
    tdxData: [],
    assessmenterrFlag: false,
    isLoading: true,
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
        case 'SET_LOADING_TRUE' :
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        default:
            return state
    }
}