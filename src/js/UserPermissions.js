export const getPermissions = (value) => (dispatch, getState) => {
	let store = getState();
	let permissions = store.appStore.permissions;
    let hasPermission = permissions.includes(value)
    console.log("hasPermission",hasPermission,"value",value)
	return hasPermission;
}