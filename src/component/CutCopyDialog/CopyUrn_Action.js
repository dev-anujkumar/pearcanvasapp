import { SET_SELECTION } from '../../constants/Action_Constants';

export const setSelection = (param) => {
    return { 
        type: SET_SELECTION,
        payload: param
    }
}