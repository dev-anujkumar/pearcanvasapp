import {
    REFRESH_SLATE,
    UPDATE_STATUS_REFRESH_SLATE
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    slateContentRefresh : false,
    statusOfRefreshSlate:'',
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
      default:
        return state
    }
}