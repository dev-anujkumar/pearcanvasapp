const INITIAL_STATE = {
    tableElementId : '',
    isTableLaunched : true,
    isTableElementRefeteched: false,
    tableDataValueAsHTML : {}
  };
  export default function reducer (state = INITIAL_STATE, action) {
      switch (action.type) {
          case 'LOAD_TABLE_DATA':{
              return{
                  ...state,
                  tableElementId: action.payload.elementId,
                  isTableLaunched: action.payload.isTableLaunched,
                  isTableElementRefeteched: action.payload.isTableElementRefeteched
              }
          }
          default:
              return state
      }
  }