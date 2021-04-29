import { UPDATE_PROJECT_INFO } from "../constants/Action_Constants";

export const projectInfo = (state = {}, action = {type: '', payload: ''}) => {
    // used if instead of swithc as cases were only 2
  if (action.type == UPDATE_PROJECT_INFO) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return {
      ...state,
    };
  }
};
