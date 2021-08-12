import { OWNERS_SUBSCRIBED_SLATE} from '../../constants/Action_Constants'

/**
 * Action Creator
 * Retrieves the Owner's Slate status
 */
export const isOwnersSubscribedSlate = (showPopup) => (dispatch, getState) => {
    return dispatch({
        type: OWNERS_SUBSCRIBED_SLATE,
        payload: showPopup
    })
}