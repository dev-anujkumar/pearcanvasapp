import {
  ERROR_POPUP
} from '../constants/Action_Constants'

const INITIAL_STATE = {
  show:false, 
  message:'The changes you were trying to make to the element did not get saved. Please try updating the element again.'
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

export default function reducer (state = INITIAL_STATE, action = INITIAL_ACTION) {
  switch (action.type) {
    case ERROR_POPUP: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

