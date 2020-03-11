import { GET_PROJECT_PERMISSIONS } from '../../constants/Action_Constants';

export const handleUserRole = (permissions , roleId) => (dispatch, getState) => {
    dispatch({
		type: GET_PROJECT_PERMISSIONS,
		payload: {
			permissions : permissions,
			roleId : roleId
		}
	});
}