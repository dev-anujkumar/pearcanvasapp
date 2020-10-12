import {
  ERROR_POPUP,
  MULTIPLE_LINE_POETRY_ERROR_POPUP,
  ELM_PORTAL_API_ERROR
} from '../constants/Action_Constants'

const INITIAL_STATE = {
  show:false, 
  message:'The element you tried to create or update did not save. Please try again.',
  isElmApiError:""
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
  switch (action.type) {
    case ERROR_POPUP: {
      return {
        ...state,
        show : action.payload.show,
        message : 'The element you tried to create or update did not save. Please try again.'
      }
    }
    case MULTIPLE_LINE_POETRY_ERROR_POPUP: {
      return {
        ...state,
        show : action.payload.show,
        message : action.payload.message
      }
    }
    case ELM_PORTAL_API_ERROR: {
      return {
        ...state,
        show: action.payload.showError,
        message: action.payload.errorMessage,
        isElmApiError: action.payload.isElmApiError
      }
    }
    default:
      return state
  }
}

