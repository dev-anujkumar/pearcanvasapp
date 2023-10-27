import { UPDATE_PROJECT_INFO, UPDATE_DISCUSSION_ITEMS, UPDATE_USAGE_TYPE, UPDATE_LOB_PERMISSIONS, SET_PROJECT_SHARING_ROLE, SET_PROJECT_SUBSCRIPTION_DETAILS, OWNERS_SUBSCRIBED_SLATE, UPDATE_LOB_WORKFLOW, PROJECT_LOB_LIST, NO_DISCUSSION_ITEMS, BANNER_IS_VISIBLE, SUBSCRIBERS_SUBSCRIBED_SLATE, SET_TOC_SLATE_LABEL } from "../constants/Action_Constants";

var isOwnerKeyExist= localStorage.getItem('hasOwnerEdit');
let isSubscriberKeyExist = localStorage.getItem('hasSubscriberView');
const initialState = {
  usageType: [],
  discussionItems: [],
  showPlayscript: true,
  showDiscussion: true,
  projectSharingRole: '',
  projectSubscriptionDetails: {
    isSubscribed: false,
    owner: {}
  },
  isOwnersSubscribedSlateChecked: isOwnerKeyExist ? false : true,
  workflowRole:{},
  LOBList:[],
  showDiscussionLOBDropdown: false,
  isBannerVisible: false,
  isSubscribersSubscribedSlateChecked : isSubscriberKeyExist ? false : true,
  slateTocLabel:{}
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

        case PROJECT_LOB_LIST: {
          return {
            ...state,
            LOBList: action.payload
          }
        }

        case NO_DISCUSSION_ITEMS: {
          return {
            ...state,
              showDiscussionLOBDropdown: action.payload
          }
        }

        case UPDATE_LOB_PERMISSIONS: {
          return {
            ...state,
            showPlayscript: action.payload.playscript,
            showDiscussion: action.payload.discussion
          }
        }

        case UPDATE_LOB_WORKFLOW: {
          return {
            ...state,
            workflowRole: action.payload,
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
        case OWNERS_SUBSCRIBED_SLATE:
            return {
                ...state,
                isOwnersSubscribedSlateChecked: action.payload
            }
        case SUBSCRIBERS_SUBSCRIBED_SLATE:
            return {
              ...state,
              isSubscribersSubscribedSlateChecked: action.payload
            }
          case BANNER_IS_VISIBLE:
            return {
              ...state,
              isBannerVisible: action.payload
            }
          case SET_TOC_SLATE_LABEL:
            return {
              ...state,
              slateTocLabel:action.payload
            }

        default : {
            return {
                ...state
            }
        }
    }
}