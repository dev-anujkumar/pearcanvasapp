import {LT_API_RESULT,
    LT_API_RESULT_FAIL,
    SELECTED_FIGURE,
    // PAGINATION,
    LEARNING_TOOL_DIS_VALUE,
    TOGGLE_LT_POPUP,
    GET_DISCIPLINE,
    REMOVE_SELECTED_DATA,
    GET_DISCIPLINE_FAIL,
    LT_TYPE_FILTER_SELECTED,
    GET_LEARNING_SYSTEMS
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
    learningToolDisValue:""
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
                linkButtonDisable : true
        }
        case LT_API_RESULT_FAIL :
            return {
                ...state,
                showDisFilterValues : action.payload.showDisFilterValues
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
        case GET_DISCIPLINE_FAIL: {                
            return {
                ...state,
                showDisFilterValues : action.payload.showDisFilterValues,

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
                showDisFilterValues: action.payload.showDisFilterValues
            }
        }
        default :
            return state
    }
}