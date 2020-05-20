const INITIAL_STATE = {
    isLoading:true,
    elmLoading:true,
    openSearch:false,
    searchTerm:''
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function elmReducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch(action.type){
        case 'GET_ELM_RESOURCES' :
            return {
               ...state,
               elmData : action.payload.data,
               errFlag : action.payload.errFlag,
               apiStatus : action.payload.apiStatus,
            //    openSearch: action.payload.openSearch
            //    elmLoading: action.payload.elmLoading
            }
        case 'GET_ELM_ITEMS':
            return {
                ...state,
                elmItemData: action.payload.data,
                itemErrorFlag: action.payload.errFlag,
                itemApiStatus: action.payload.apiStatus,
                isLoading: action.payload.isLoading,
                openSearch: action.payload.openSearch
            }
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case 'SET_ELM_LOADING_TRUE':
            return {
                ...state,
                elmLoading: action.payload.elmLoading
            }
        case 'SET_SEARCH_FLAG':
            return {
                ...state,
                openSearch: action.payload.openSearch
            }
        case 'SET_SEARCH_TERM':
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        default:
            return state
    }
}