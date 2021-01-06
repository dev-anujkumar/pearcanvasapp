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
  GET_LEARNING_SYSTEMS,
  SET_LT_LA_SEARCH_LOADING
} from '../../../constants/Action_Constants';
import { LT_LA_API_ERROR } from './learningToolUtility';
import { specialCharacterEncode } from '../assessmentCiteTdx/Actions/CiteTdxActions.js';
/**
  * @discription - This action is dispatched when search of leaning template
  * @param {String} toolType - value of learning tool type selected from dropdown
  * @param {String} learningSystem - value of learning system type selected
  */
export const learningToolSearchAction = (learningSystem, learningAppType, searchLabel, searchKeyword) => dispatch => {
  const searchTitle = specialCharacterEncode(searchLabel);
  const url = config.ASSESSMENT_ENDPOINT + `learningtemplate/v2/?learningsystem=${learningSystem}&&type=${learningAppType}&&label=${searchTitle}&&keyword=${searchKeyword}`;
  dispatch({ type: SET_LT_LA_SEARCH_LOADING, payload: { searchLoading: true, showLTBody:true } });
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
          showLTBody: true,
          errorFlag: false,
          searchLoading: false,
          showAppTypeValues:true
        }
      })
    },
    ).catch(error => {
      console.error('Error in fetching from LT_LA API', error)
      dispatch({
        type: LT_API_RESULT_FAIL, 
        payload: {
          showLTBody: true,
          errorFlag: true,
          searchLoading: false
        }
      })
    })
};

/**
  * @discription This action is dispached to fetch dropdown values for Learning Systems 
  *               and Disciplines based on taxomonic IDs
  * @param {String} taxonomyId taxonomy ID
  */
export const openLTFunction = (taxonomyId) => dispatch => {
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
      dispatch(getDiscipline(res.data));
  },
    err => showError(err, 'showDisFilterValues', dispatch)
  ).catch(error => {
    showError(error, 'showDisFilterValues', dispatch)
  })
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
      apiResponseForDis: data.options
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
  * @discription This action is dispached to fetch dropdown values for Learning Systems 
  */
export const fetchLearningTemplates = () => async dispatch => {
  let url = 'https://10.11.7.24:8081/cypress-api/v1/content/assessment/learningobjectivetemplate';  
  // let url = `${config.REACT_APP_API_URL}v1/content/assessment/learningobjectivetemplate`;
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'PearsonSSOSession': config.ssoToken
    }
  })
  try {
    const res = await resp.json();
    res && res.length > 0 && dispatch(fetchLearningSystems(res));
  } catch (error) {
    showError(error, 'showAppTypeValues', dispatch);
  }
};

/**
* @discription - This action is dispatched to get the all the learning systems to show in dropdown
*/
export const fetchLearningSystems = (learningSystems) => {
  return {
    type: GET_LEARNING_SYSTEMS,
    payload: {
      showAppTypeValues: true,
      learningSystems: learningSystems
    }
  }
};

/**
* @discription - This function is to handle Error when LT-LA API fails
*/
const showError = (error, errKey, dispatch) => {
  dispatch({
    type: LT_API_RESULT_FAIL,
    payload: {
      error: error,
      [errKey]: false
    }
  })
  console.error(LT_LA_API_ERROR, error)
}