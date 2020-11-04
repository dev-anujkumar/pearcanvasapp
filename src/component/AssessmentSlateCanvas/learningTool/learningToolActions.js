/** 
 * This Module contains all the Actions related to Learning Tool-Learning App Assessments 
 */
import config from '../../../config/config';
import axios from 'axios';
import {
  LT_API_RESULT,
  LT_API_RESULT_FAIL,
  SELECTED_FIGURE,
  PAGINATION,
  LEARNING_TOOL_DIS_VALUE,
  TOGGLE_LT_POPUP,
  GET_DISCIPLINE,
  REMOVE_SELECTED_DATA,
  LINK_BUTTON_DISABLE,
  GET_LEARNING_SYSTEMS
} from '../../../constants/Action_Constants';
import { learningSystemList, TAXONOMIC_ID_DISCIPLINES, TAXONOMIC_ID_LEARNING_SYSTEM, LT_LA_API_ERROR } from './learningToolUtility';
import { specialCharacterEncode } from '../assessmentCiteTdx/Actions/CiteTdxActions.js';
/**
  * @discription - This action is dispatched when search of leaning template
  * @param {String} toolType - value of learning tool type selected from dropdown
  * @param {String} learningSystem - value of learning system type selected
  */
export const learningToolSearchAction = (learningSystem, learningAppType, searchLabel, searchKeyword) => dispatch => {
  let searchTitle = specialCharacterEncode(searchLabel);
  let url = config.ASSESSMENT_ENDPOINT + `learningtemplate/v2/?learningsystem=${learningSystem}&&type=${learningAppType}&&label=${searchTitle}&&keyword=${searchKeyword}`;
  
  return axios.get(url,
    {
      headers: {
        'X-Roles': 'ContentPlanningAdmin',
        'Content-Type': 'application/json',
        'apikey': config.STRUCTURE_APIKEY,
        'pearsonssosession': config.ssoToken
      }
    }
  )
    .then(res => {
      dispatch({
        type: LT_API_RESULT, 
        payload: {
          apiResponse: res.data,
          showDisFilterValues: true,
          showLTBody: true
        }
      })
    },
      err => dispatch({
        type: LT_API_RESULT_FAIL, 
        payload: {
          error: err,
          showDisFilterValues: false
        }
      })
    ).catch(error => {
      //console.log('this is error while fetching from LT_LA api', error)
    })
};

/**
  * @discription This action is dispached to fetch dropdown values for Learning Systems 
  *               and Disciplines based on taxomonic IDs
  * @param {String} taxonomyId taxonomy ID
  */
export const openLTFunction = (taxonomyId) => dispatch => {

  if (taxonomyId === TAXONOMIC_ID_LEARNING_SYSTEM) {
    dispatch(fetchLearningSystems(learningSystemList))
  } else {
    let url = `${config.ASSESSMENT_ENDPOINT}learningtemplate/v2/taxonomy/${taxonomyId}?locale=en`;
    return axios.get(url,
      {
        headers: {
          'X-Roles': 'ContentPlanningAdmin',
          'Content-Type': 'application/json',
          'apikey': config.STRUCTURE_APIKEY,
          'pearsonssosession': config.ssoToken
        }
      }
    ).then(res => {
      if (taxonomyId === TAXONOMIC_ID_DISCIPLINES) {
        dispatch(getDiscipline(res.data))
      }
      /* else {
         dispatch(fetchLearningSystems(res.data)) --------> To be used when the API is integrated 
      }*/
    },
      err => showError(err, dispatch)
    ).catch(error => {
      showError(error, dispatch)
    })
  }
};

/**
* @discription - This action is dispatched when the figure has been selected in table body
* @param {String} selectedFigure - value of selected figure
*/
export const selectedFigureAction = (selectedFigure) => {
  return {
    type: SELECTED_FIGURE,
    payload: {
      selectedFigure: selectedFigure
    }
  }
}

/**
* @discription - This action is dispached when the there pagination needed for the result
* @param {String} numberOfRows - number of rows
*/
export const paginationFunctionAction = (numberOfRows) => {
  return {
    type: PAGINATION,
    payload: {
      numberOfRows: numberOfRows
    }
  }
}

/**
* @discription - This action is dispatched when discipline filter is selected
* @param {String} learningToolDisValue - learning tool discipline vlaue
*/
export const learningToolDisFilterAction = (learningToolDisValue) => {
  return {
    type: LEARNING_TOOL_DIS_VALUE,
    payload: {
      learningToolDisValue: learningToolDisValue
    }
  }
}

/**
* @discription - This action is dispatched closing of learning Tool
*/
export const closeLtAction = () => {
  return {
    type: TOGGLE_LT_POPUP,
    payload: {
      toggleLT: false
    }
  }
}

/**
* @discription - This action is dispached open of learning Tool
*/
export const openLtAction = () => {
  return {
    type: TOGGLE_LT_POPUP,
    payload: {
      toggleLT: true
    }
  }
}

/**
* @discription - This action is dispatched to get the all the discipline to show in dropdown
*/
export const getDiscipline = (data) => {
  return {
    type: GET_DISCIPLINE, 
    payload: {
      showDisFilterValues: true,
      apiResponseForDis: data
    }
  }
}

/**
* @discription - This action is dispatched to remove the selected data from the store
*/
export const removeSelectedData = () => {
  return {
    type: REMOVE_SELECTED_DATA,
  }
}

/**
* @discription - This action is dispatched to disable the link according to the api result
*/
export const linkDisable = () => {
  return {
    type: LINK_BUTTON_DISABLE,
  }
}

/**
* @discription - This action is dispatched to get the all the learning systems to show in dropdown
*/
export const fetchLearningSystems = (learningSystems) => {
  return {
    type: GET_LEARNING_SYSTEMS,
    payload: {
      showDisFilterValues: true,
      learningSystems: learningSystems
    }
  }
};

/**
* @discription - This function is to handle Error when LT-LA API fails
*/
const showError = (error, dispatch) => {
  dispatch({
    type: LT_API_RESULT_FAIL,
    payload: {
      error: error,
      showDisFilterValues: false
    }
  })
  console.error(LT_LA_API_ERROR, error)
}