import {
    TOGGLE_BORDERS, TOGGLE_LO_DROPDOWN
} from '../../constants/Action_Constants';

/**
 * Action for border toggle hide/show
 */
export const toggleElemBordersAction = () => {
    return {
        type: TOGGLE_BORDERS
    }
}
export const toggleLODropdown = () => {
    return {
        type: TOGGLE_LO_DROPDOWN
    }
}