const INITIAL_STATE = {
    citeData: [],
    tdxData: [],
    mmiData: [],
    assessmenterrFlag: false,
    isLoading: true,
    currentAssessmentSelected:{},
    singleAssessmentData:[],
    currentSingleAssessmentSelected:{},
    sortOrder:'',
    sortBy:'',
    searchUuidVal:"",
    searchTitleVal:""
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function citeTdxReducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
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
        case "CURRENT_SELECTED_SINGLE_ASSESSMENT": {
            return {
                ...state,
                currentSingleAssessmentSelected: action.payload
            }
        }
        case "GET_SINGLE_ASSESSMENT_DATA": {
            return {
                ...state,
                singleAssessmentData: action.payload,
                assessmenterrFlag : action.payload.errFlag,
                isLoading: action.payload.isLoading
            }
        }
        case "ASSESSMENT_SORTING": {
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortOrder : action.payload.sortOrder
            }
        }
        case 'SET_SEARCH_PARAMS': {
            return {
                ...state,
                searchUuidVal: action.payload.searchUUID,
                searchTitleVal: action.payload.searchTitle
            }
        }
        default:
            return state
    }
}