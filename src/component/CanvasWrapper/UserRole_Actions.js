import { GET_PROJECT_PERMISSIONS } from '../../constants/Action_Constants';

export const handleUserRole = (permissions) => (dispatch, getState) => {
    dispatch({
		type: GET_PROJECT_PERMISSIONS,
		payload: permissions
	});
}