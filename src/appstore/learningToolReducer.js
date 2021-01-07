import {LT_API_RESULT,
    LT_API_RESULT_FAIL,
    SELECTED_FIGURE,
    LEARNING_TOOL_DIS_VALUE,
    TOGGLE_LT_POPUP,
    GET_DISCIPLINE,
    REMOVE_SELECTED_DATA,
    LT_TYPE_FILTER_SELECTED,
    GET_LEARNING_SYSTEMS,
    SET_LT_LA_SEARCH_LOADING
  } from '../constants/Action_Constants';

const INITIAL_STATE = {
    shouldHitApi : false,
    apiResponse : [],
    showLTBody : false,
    showDisFilterValues : false,
    selectedResultFormApi : '',
    resultIsSelected : false,
    toggleLT : false,
    linkButtonDisable : true,
    apiResponseForDis : [],
    learningSystems:[],
    showTypeFilterValues: false,
    learningToolDisValue:"",
    errorFlag: false,
    showAppTypeValues: false
};

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function learningToolReducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case LT_TYPE_FILTER_SELECTED :
            return {
                ...state,
                shouldHitApi : action.payload.shouldHitApi
        }
        case LT_API_RESULT :
            return {
                ...state,
                selectedResultFormApi : '',
                apiResponse: action.payload.apiResponse.filter((value, index, array) => {
                    let tempDisToMatchArray = value.disciplines.en;
                    if (state.learningToolDisValue !== '') {
                        let temp1 = tempDisToMatchArray.indexOf(state.learningToolDisValue.toLowerCase());
                        return temp1 >= 0;
                    } else {
                        return true;
                    }
                }),
                showDisFilterValues : action.payload.showDisFilterValues,
                showLTBody : action.payload.showLTBody,
                linkButtonDisable : true,
                errorFlag: action.payload.errorFlag,
                searchLoading : action.payload.searchLoading,
                showAppTypeValues: action.payload.showAppTypeValues
        }
        case LT_API_RESULT_FAIL :
            return {
                ...state,
                errorFlag: action.payload.errorFlag,
                showLTBody: action.payload.showLTBody,
                searchLoading : action.payload.searchLoading
        }
        case SELECTED_FIGURE: {
            return {
                ...state,
                selectedResultFormApi : action.payload.selectedFigure,
                resultIsSelected : true,
                linkButtonDisable : false
            }
        }
        case TOGGLE_LT_POPUP: {               
            return {
                ...state,
                toggleLT : action.payload.toggleLT,
                apiResponse : [],
                showLTBody : false,
                linkButtonDisable : action.payload.linkButtonDisable,
                learningToolDisValue : ''
            }
        }
        case LEARNING_TOOL_DIS_VALUE: {               
            return {
                ...state,
                learningToolDisValue : action.payload.learningToolDisValue
            }
        }
        case GET_DISCIPLINE: {                 
            return {
                ...state,
                showDisFilterValues : action.payload.showDisFilterValues,
                apiResponseForDis : action.payload.apiResponseForDis
            }
        }
        case REMOVE_SELECTED_DATA: {
            return {
                ...state,
                selectedResultFormApi : "",
             
            }
        }        
        case GET_LEARNING_SYSTEMS: {                
            return {
                ...state,
                learningSystems : action.payload.learningSystems,
                showAppTypeValues: action.payload.showAppTypeValues
            }
        }
        case SET_LT_LA_SEARCH_LOADING: {
            return {
                ...state,
                showLTBody: action.payload.showLTBody,
                searchLoading : action.payload.searchLoading
            }
        }
        default :
            return state
    }
}