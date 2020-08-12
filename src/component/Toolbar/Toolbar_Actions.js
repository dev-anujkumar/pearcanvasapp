import {
    TOGGLE_BORDERS, TOGGLE_LO_DROPDOWN, TOGGLE_PAGE_NUMBER
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
export const togglePageNumberAction = () => {
    return {
        type: TOGGLE_PAGE_NUMBER
    }
}