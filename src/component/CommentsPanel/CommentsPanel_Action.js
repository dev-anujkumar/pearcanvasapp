
export const toggleCommentsPanel = (toggle) => dispatch => {

        dispatch({
        	type: TOGGLE_COMMENTs_PANEL,
        	payload: toggle
        })
};