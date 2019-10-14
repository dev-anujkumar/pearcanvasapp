import {
    REFRESH_SLATE,
    UPDATE_STATUS_REFRESH_SLATE,
    UPDATE_REAL_TIME
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    slateContentRefresh : false,
    statusOfRefreshSlate:'Refreshed a moment ago',
    showRealTimeStatus : '',
    isCOSlate : false
}


export default function reducer (state = INITIAL_STATE, action) {
    switch (action.type) {
    case REFRESH_SLATE: {
        return {
          ...state,
          slateContentRefresh: action.payload
        }
      }
      case UPDATE_STATUS_REFRESH_SLATE : {
        return {
          ...state,
          statusOfRefreshSlate: action.payload
        }
      }
      case UPDATE_REAL_TIME: {
        return {
          ...state,
          showRealTimeStatus: action.payload
        }
      }
      default:
        return state
    }
}