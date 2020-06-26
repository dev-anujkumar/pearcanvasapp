import config from '../../../config/config';
const API_URL = config.API_URL
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
  LINK_BUTTON_DISABLE
} from '../../../constants/Action_Constants';

/**
  * @discription - This action is dispached when search of leaning template
  * @param {String} toolType - value of learning tool type selected from dropdown
  * @param {String} learningSystem - value of learning system type selected
  */

export const toolTypeFilterSelectedAction = (toolType, learningSystem) => dispatch => {

  let url = config.ASSESSMENT_ENDPOINT + `learningtemplate/v2/?learningsystem= ${learningSystem}&&type=${toolType}`
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
        type: LT_API_RESULT, payload: {
          apiResponse: res.data,
          learningTypeSelected: true,
          showDisFilterValues: true,
          showLTBody: true,
          learningToolTypeValue: toolType
        }
      })},
      err => dispatch({
        type: LT_API_RESULT_FAIL, payload: {
          error: err,
          showDisFilterValues: false
        }
      })
    ).catch(error => {
      //console.log('this is error while fetching from LT_LA api', error)
    })
};


/**
  * @discription - This action is dispached when search of leaning template with keyword
  * @param {String} learningToolSearchValue - value of keyword to be searched
  * @param {String} toolType1 - value of learning tool type selected from dropdown
  * @param {String} learningSystem - value of learning system type selected
  */

export const learningToolSearchAction = (learningToolSearchValue, toolType1, learningSystem) => dispatch => {

  let url = config.ASSESSMENT_ENDPOINT + `learningtemplate/v2/?learningsystem= ${learningSystem}&&type=${toolType1}&&keyword=${learningToolSearchValue}`
  if (learningToolSearchValue) {
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
          type: LT_API_RESULT, payload: {
            apiResponse: res.data,
            learningTypeSelected: true,
            showDisFilterValues: true,
            showLTBody: true,
            learningToolTypeValue: toolType1
          }
        })},
        err => dispatch({
          type: LT_API_RESULT_FAIL, payload: {
            error: err,
            showDisFilterValues: false
          }
        })
      ).catch(error => {
        //console.log('this is error while fetching from LT_LA api', error)
    })
  }
};

export const openLTFunction = () => dispatch => {

  let url = config.ASSESSMENT_ENDPOINT + 'learningtemplate/v2/taxonomy/disciplines?locale=en';
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
        dispatch(getDiscipline(res.data))},
        err => dispatch({
          type: LT_API_RESULT_FAIL, payload: {
            error: err,
            showDisFilterValues: false
          }
        })
      ).catch(error => {
        //console.log('this is error while fetching from LT_LA api', error)
    })
 
};
/**
* @discription - This action is dispached when the figure has been selected in table body
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
* @discription - This action is dispached when discipline filter is selected
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
* @discription - This action is dispached closing of learning Tool
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
* @discription - This action is dispached to get the all the discipline to show in dropdown
*/
export const getDiscipline = (data) => {
  return {
    type: GET_DISCIPLINE, payload: {
      showDisFilterValues: true,
      apiResponseForDis: data
    }
  }
}

/**
* @discription - This action is dispached to remove the selected data from the store
*/

export const removeSelectedData = () => {
  return {
    type: REMOVE_SELECTED_DATA,
  }
}

/**
* @discription - This action is dispached to disable the link according to the api result
*/
export const linkDisable = () => {
  return {
    type: LINK_BUTTON_DISABLE,
  }
}