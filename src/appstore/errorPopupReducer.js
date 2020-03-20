import {
  ERROR_POPUP
} from '../constants/Action_Constants'

const INITIAL_STATE = {
  show:false, 
  message:'The element you tried to create or update did not save. Please try again.'
}

const INITIAL_ACTION = {
  type: '',
  payload: {}
}

/**
 * Reducer method for user related activation, deactivation and projects
 * @param {object} state 
 * @param {string} action 
 */

export default function errorPopupReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
  if (action.type === ERROR_POPUP) {
    return {
      ...state,
      ...action.payload
    }
  } else {
    return state
  }
}

