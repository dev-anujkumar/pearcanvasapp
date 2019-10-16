import config from '../../../config/config';
const API_URL = config.API_URL
import axios from 'axios';
import {LT_API_RESULT,
  LT_API_RESULT_FAIL,
  SELECTED_FIGURE,
  PAGINATION,
  LEARNING_TOOL_DIS_VALUE,
  TOGGLE_LT_POPUP,
  GET_DISCIPLINE,
  REMOVE_SELECTED_DATA,
  LINK_BUTTON_DISABLE
} from '../../../constants/Action_Constants';

export const toolTypeFilterSelectedAction = (toolType, learningSystem) =>  dispatch =>{

  let url = config.STRUCTURE_API_URL + `core/learningtemplate/v2/?learningsystem= ${learningSystem}&&type=${toolType}`
  return axios.get(url,
      { headers:  {
        'X-Roles': 'ContentPlanningAdmin',
        'Content-Type': 'application/json',
        'apikey': config.STRUCTURE_APIKEY,
        'pearsonssosession': config.ssoToken
      } }
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
        }),
        err => dispatch({
          type: LT_API_RESULT_FAIL, payload: {
            error: err,
            showDisFilterValues: false
          }
        })

      }).catch(error => console.log('this is error while fetching from LT_LA api', error))
};


export const learningToolSearchAction = (learningToolSearchValue, toolType1, learningSystem) => dispatch => {

  let url = config.STRUCTURE_API_URL + `core/learningtemplate/v2/?learningsystem= ${learningSystem}&&type=${toolType1}&&keyword=${learningToolSearchValue}`
  if (learningToolSearchValue) {
  return axios.get(url,
      { headers:  {
        'X-Roles': 'ContentPlanningAdmin',
        'Content-Type': 'application/json',
        'apikey': config.STRUCTURE_APIKEY,
        'pearsonssosession': config.ssoToken
      } }
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
        }),
        err => dispatch({
          type: LT_API_RESULT_FAIL, payload: {
            error: err,
            showDisFilterValues: false
          }
        })

      }).catch(error => console.log('this is error while fetching from LT_LA api', error))
  }
};

export const selectedFigureAction = (selectedFigure) => {
  return {
    type: SELECTED_FIGURE,
    payload: {
      selectedFigure: selectedFigure
    }
  }
}

export const paginationFunctionAction = (numberOfRows) => {
  return {
    type: PAGINATION,
    payload: {
      numberOfRows: numberOfRows
    }
  }
}

export const learningToolDisFilterAction = (learningToolDisValue) => {
  return {
    type: LEARNING_TOOL_DIS_VALUE,
    payload: {
      learningToolDisValue: learningToolDisValue
    }
  }
}

export const closeLtAction = () => {
  return {
    type: TOGGLE_LT_POPUP,
    payload: {
      toggleLT: false
    }
  }
}
export const openLtAction = () => {
  return {
    type: TOGGLE_LT_POPUP,
    payload: {
      toggleLT: true
    }
  }
}
export const getDiscipline = (data) => {
  return {
    type: GET_DISCIPLINE, payload: {
      showDisFilterValues: true,
      apiResponseForDis: data
    }
  }
}
export const removeSelectedData = () => {
  return {
    type: REMOVE_SELECTED_DATA,
  }
}
export const linkDisable = () => {
  return {
    type: LINK_BUTTON_DISABLE,
  }
}