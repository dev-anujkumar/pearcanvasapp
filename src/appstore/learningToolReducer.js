const INITIAL_STATE = {
    shouldHitApi : false,
    learningToolTypeValue : '',
    apiResponse : [],
    showErrorMsg : true, //should be false
    showLTBody : false,
    learningTypeSelected : false,
    showDisFilterValues : false,
    selectedResultFormApi : '',
    resultIsSelected : false,
    toggleLT : false,
    linkButtonDisable : true,
    apiResponseForDis : [],
    learningToolDisValue : '',
    numberOfRows : 25
};

export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LT_TYPE_FILTER_SELECTED' :
            return {
                ...state,
                shouldHitApi : action.payload.shouldHitApi,
                learningToolTypeValue : action.payload.learningToolTypeValue,
        }
        case 'LT_API_RESULT' :
            return {
                ...state,
                selectedResultFormApi : '',
                apiResponse : action.payload.apiResponse.filter((value, index, array) => {
                    let tempDisToMatchArray = value.disciplines.en;
                    if(state.learningToolDisValue !==''){
                        let temp1 = tempDisToMatchArray.indexOf(state.learningToolDisValue.toLowerCase());
                        if (temp1 >= 0) {
                            return true
                        } else {
                            return false
                        }
                    }else{
                        return true;
                    }
 
                }),
                showDisFilterValues : action.payload.showDisFilterValues,
                showLTBody : action.payload.showLTBody,
                learningTypeSelected : action.payload.learningTypeSelected,
                linkButtonDisable : true,
                learningToolTypeValue : action.payload.learningToolTypeValue
        }
        case 'LT_API_RESULT_FAIL' :
            return {
                ...state,
                showErrorMsg : true,
                showDisFilterValues : action.payload.showDisFilterValues
        }
        case 'SELECTED_FIGURE': {                 //Selected Figure name
            return {
                ...state,
                selectedResultFormApi : action.payload.selectedFigure,
                resultIsSelected : true,
                linkButtonDisable : false
            }
        }
        case 'TOGGLE_LT_POPUP': {               
            return {
                ...state,
                toggleLT : action.payload.toggleLT,
                apiResponse : [],
                showLTBody : false,
                linkButtonDisable : action.payload.linkButtonDisable,
                learningToolDisValue : ''
            }
        }
        case 'LEARNING_TOOL_DIS_VALUE': {               
            return {
                ...state,
                learningToolDisValue : action.payload.learningToolDisValue
            }
        }
        case 'GET_DISCIPLINE': {                 
            return {
                ...state,
                showDisFilterValues : action.payload.showDisFilterValues,
                apiResponseForDis : action.payload.apiResponseForDis
            }
        }
        case 'GET_DISCIPLINE_FAIL': {                
            return {
                ...state,
                showDisFilterValues : action.payload.showDisFilterValues,

            }
        }
        case 'PAGINATION': {                
            return {
                ...state,
                numberOfRows : action.payload.numberOfRows,
            }
        }
        case 'REMOVE_SELECTED_DATA': {                 //Selected Figure name
            return {
                ...state,
                selectedResultFormApi : "",
             
            }
        }
        default :
            return state
    }
}