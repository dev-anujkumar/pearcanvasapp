import reducer from '../../src/appstore/tcmReducer';

import {
    GET_TCM_RESOURCES,
    GET_TCM_STATUS_OF_PROJECT,
    LAUNCH_TCM_CANVAS_POPUP,
    SPINNER
} from '../../src/constants/Action_Constants';

const INITIAL_STATE = {
    tcmSnapshot: [],
    tcmActivatedOnProjectLevel: false,
    isTCMCanvasPopupLaunched : false,
    tcmSnapshotData: [],
    elementData:"",
    elementEditor: '',
    tcmStatus: false,
    spinnerStatus: false,
    prevElementId : ''
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}


describe('Test tcmReducer', () => {
    it('GET_TCM_RESOURCES', () => {
        
        reducer(INITIAL_STATE, {
            type: GET_TCM_RESOURCES,
            payload: {
                data: "testing"
            }
        })
    })
    it('GET_TCM_STATUS_OF_PROJECT', () => {
        
        reducer(INITIAL_STATE, {
            type: GET_TCM_STATUS_OF_PROJECT,
            payload: {
                tcm_activated_project: false
            }
        })
    })
    it('SPINNER', () => {
        
        reducer(INITIAL_STATE, {
            type: SPINNER,
            payload: {
                spinnerStatus: false
            }
        })
    })
    it('LAUNCH_TCM_CANVAS_POPUP', () => {
        
        reducer(INITIAL_STATE, {
            type: LAUNCH_TCM_CANVAS_POPUP,
            payload: {
                isTCMCanvasPopupLaunched: false,
                    tcmSnapshotData: [],
                    elementData: "testing",
                    elementEditor: "testing",
                    tcmStatus: false,
                    spinnerStatus:false,
                    prevElementId: '4'
            }
        })
    })
    it('Test Initial State', () => {
        expect(reducer(INITIAL_STATE)).toEqual(INITIAL_STATE);
    });

});