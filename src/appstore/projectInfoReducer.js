import { UPDATE_PROJECT_INFO, UPDATE_DISCUSSION_ITEMS, UPDATE_USAGE_TYPE, UPDATE_SHOW_PLAYSCRIPT, UPDATE_SHOW_DISCUSSION } from "../constants/Action_Constants";

const initialState = {
  usageType: [],
  discussionItems: [],
  showPlayscript: true,
  showDiscussion: true
}

export const projectInfo = (state = initialState, action={type:'', payload:{}}) => {
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

        case UPDATE_SHOW_PLAYSCRIPT: {
          return {
            ...state,
            showPlayscript: action.payload
          }
        }

        case UPDATE_SHOW_DISCUSSION: {
          return {
            ...state,
            showDiscussion: action.payload
          }
        }
        default : {
            return {
                ...state
            }
        }
    }
}