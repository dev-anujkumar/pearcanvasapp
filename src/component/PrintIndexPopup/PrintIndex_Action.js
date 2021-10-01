import {OPEN_PRINT_INDEX} from '../../constants/Action_Constants';

export const printIndexPopup = (value) => (dispatch) => {
    dispatch({
        type: OPEN_PRINT_INDEX,
        payload: value
    });
};