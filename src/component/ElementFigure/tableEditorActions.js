export const loadTableData = (value) => (dispatch, getState) => {
    dispatch({
        type: 'LOAD_TABLE_DATA',
        payload: value
    })
}
// export const resetTableDataAction = (value) => (dispatch, getState) => {
//     dispatch({
//         type: 'REMOVE_ACTION_AFTER_DATALOADED',
//         payload: value
//     })
// }
