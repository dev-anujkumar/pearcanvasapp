import metadataReducer from '../../src/appstore/metadataReducer';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:"",
    showSlateLockPopup:false,
    isRenderMetdataLO:false,
    projectLearningFrameworks:{
        cypressLF:{},
        externalLF:[]
    },
    currentSlateLF:"",
    loWarningPopupData: {}
}

const currentSlateLOData = { currentSlateLOData: "",
slateTagEnable: false,
showModule:false,
currentSlateLODataMath:"",
showSlateLockPopup: false,
isRenderMetdataLO:false
}

const getLOState = { 
    ...INIT_STATE,
    currentSlateLOData: ""
}

describe('testing meta data Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(metadataReducer(undefined, {})).toEqual(INIT_STATE);
    });
    it('get LO data', () => {
        expect(metadataReducer(INIT_STATE, {
            type: 'CURRENT_SLATE_LO_DATA',
            payload: 
                 currentSlateLOData
            
        })).toEqual(getLOState);
    })
    it('SLATE_TAG_ENABLE', () => {
        let state1 = INIT_STATE;
        state1.slateTagEnable = true;
        expect(metadataReducer(INIT_STATE, {
            type: 'SLATE_TAG_ENABLE',
            payload: true
            
        })).toEqual(state1);
    })
    it('SHOW_MODULE_NAME', () => {
        let state2 = INIT_STATE;
        state2.showModule = true;
        expect(metadataReducer(INIT_STATE, {
            type: 'SHOW_MODULE_NAME',
            payload: true
            
        })).toEqual(state2);
    })
    it('CURRENT_SLATE_LO_DATA_MATH', () => {
        let state3 = INIT_STATE;
        state3.currentSlateLODataMath = '';
        expect(metadataReducer(INIT_STATE, {
            type: 'CURRENT_SLATE_LO_DATA_MATH',
            payload: {currentSlateLODataMath:''}
            
        })).toEqual(state3);
    })
    it('SHOW_SLATE_LOCK_POPUP', () => {
        let state4 = INIT_STATE;
        state4.showSlateLockPopup = true;
        expect(metadataReducer(INIT_STATE, {
            type: 'SHOW_SLATE_LOCK_POPUP',
            payload:true
            
        })).toEqual(state4);
    })
    it('RE_RENDER_META_LO', () => {
        let state5 = INIT_STATE;
        state5.isRenderMetdataLO = true;
        expect(metadataReducer(INIT_STATE, {
            type: 'RE_RENDER_META_LO',
            payload:true
            
        })).toEqual(state5);
    })
});

