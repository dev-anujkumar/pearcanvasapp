import config from '../../../config/config';
const API_URL = config.API_URL

export const toolTypeFilterSelectedAction = (toolType,learningSystem) => {
  return dispatch => fetch(API_URL + '/learningApi/toolTypeFilterSelected', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      toolType : toolType,
      learningSystem:learningSystem
    })
  }).then(res => res.json())
    .then(
      data => dispatch({
        type: 'LT_API_RESULT', payload: {
          apiResponse: data,
          learningTypeSelected: true,
          showDisFilterValues: true,
          showLTBody: true,
          learningToolTypeValue: toolType

        }
      }),
      err => dispatch({
        type: 'LT_API_RESULT_FAIL', payload: {
          error: err,
          showDisFilterValues: false
        }
      })
    ).catch(error => console.log('this is error while fetching from LT_LA api', error))
}
export const learningToolSearchAction = (learningToolSearchValue, toolType1,learningSystem) => {
  if (learningToolSearchValue) {
    return dispatch => fetch(API_URL + '/learningApi/learningToolSearch', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        learningToolSearchValue : learningToolSearchValue.toLowerCase(),
        toolType1 : toolType1,
        learningSystem:learningSystem
      })
    }).then(res => res.json())
      .then(
        data => dispatch({
          type: 'LT_API_RESULT', payload: {
            apiResponse: data,
            learningTypeSelected: true,
            showDisFilterValues: true,
            showLTBody: true,
            learningToolTypeValue: toolType1
          }
        }),
        err => dispatch({
          type: 'LT_API_RESULT_FAIL', payload: {
            error: err,
            showDisFilterValues: false
          }
        })
      ).catch(error => console.log('this is error while fetching from LT_LA api', error))
  }

}
export const selectedFigureAction = (selectedFigure) => {
  return {
    type: 'SELECTED_FIGURE',
    payload: {
      selectedFigure: selectedFigure
    }
  }
}

export const paginationFunctionAction = (numberOfRows) => {
  return {
    type: 'PAGINATION',
    payload: {
      numberOfRows: numberOfRows
    }
  }
}

export const learningToolDisFilterAction = (learningToolDisValue) => {
  return {
    type: 'LEARNING_TOOL_DIS_VALUE',
    payload: {
      learningToolDisValue: learningToolDisValue
    }
  }
}

export const closeLtAction = () => {
  return {
    type: 'TOGGLE_LT_POPUP',
    payload: {
      toggleLT: false
    }
  }
}
export const openLtAction = () => {
  return {
    type: 'TOGGLE_LT_POPUP',
    payload: {
      toggleLT: true
    }
  }
}
export const getDiscipline = (data)=>{
  return{
    type: 'GET_DISCIPLINE', payload: {
      showDisFilterValues: true,
      apiResponseForDis: data
  }
  }
}
export const removeSelectedData = () => {
  return {
    type: 'REMOVE_SELECTED_DATA',
  }
}
export const linkDisable = () => {
  return {
    type: 'LINK_BUTTON_DISABLE',
  }
}