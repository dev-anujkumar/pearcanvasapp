import { UPDATE_PROJECT_INFO, UPDATE_DISCUSSION_ITEMS, UPDATE_USAGE_TYPE, UPDATE_LOB_PERMISSIONS, SET_PROJECT_SHARING_ROLE, SET_PROJECT_SUBSCRIPTION_DETAILS } from "../constants/Action_Constants";

const initialState = {
  usageType: [],
  discussionItems: [],
  showPlayscript: true,
  showDiscussion: true,
  projectSharingRole: '',
  projectSubscriptionDetails: {
    isSubscribed: false,
    owner: {}
  }
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

        case UPDATE_LOB_PERMISSIONS: {
          return {
            ...state,
            showPlayscript: action.payload.playscript,
            showDiscussion: action.payload.discussion
          }
        }

        case SET_PROJECT_SHARING_ROLE: {
          return {
            ...state,
            projectSharingRole: action.payload
          }
        }

        case SET_PROJECT_SUBSCRIPTION_DETAILS: {
          return {
            ...state,
            projectSubscriptionDetails: {
              ...action.payload
            }
          }
        }

        default : {
            return {
                ...state
            }
        }
    }
}