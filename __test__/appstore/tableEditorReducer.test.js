import reducer from '../../src/appstore/tableEditorReducer';

const INITIAL_STATE = {
    tableElementId : '',
    isTableLaunched : true,
    isTableElementRefeteched: false,
    tableDataValueAsHTML : {}
  };

const newTable={}
  xdescribe('testing table Editor Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });
    it('Test- LOAD_TABLE_DATA', () => {
     expect(toolbarReducer(INITIAL_STATE, {
            type: 'LOAD_TABLE_DATA',
            payload: {
                elementId: "",
                isTableLaunched:true,
                isTableElementRefeteched:true
            }
        })).toEqual(expectedState);
    })
});

