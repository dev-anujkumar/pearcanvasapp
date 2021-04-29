import { UPDATE_PROJECT_INFO, UPDATE_DISCUSSION_ITEMS, UPDATE_USAGE_TYPE } from "../constants/Action_Constants";

export const projectInfo = (state = {}, action={type:'', payload:{}}) => {
    switch(action.type) {
        case UPDATE_PROJECT_INFO: {
            return {
                ...state,
                ...action.payload
            }
        }
        case UPDATE_USAGE_TYPE: {
          return {
            ...state,
            usageType: action.payload
          }
        }

        case UPDATE_DISCUSSION_ITEMS: {
          return {
            ...state,
            discussionItems: action.payload
          }
        }
        default : {
            return {
                ...state
            }
        }
    }
}