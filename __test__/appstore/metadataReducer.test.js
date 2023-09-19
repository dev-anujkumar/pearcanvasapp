import { initial } from 'lodash';
import metadataReducer from '../../src/appstore/metadataReducer';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:"",
    defaultLF: "",
    showSlateLockPopup:false,
    isRenderMetdataLO:false,
    projectLearningFrameworks:{
        externalLF:[]
    },
    currentSlateLF:"",
    loWarningPopupData: {},
    lastAlignedExternalLO:{}
}

const currentSlateLOData = { currentSlateLOData: "",
slateTagEnable: false,
showModule:false,
currentSlateLODataMath:"",
showSlateLockPopup: false,
isRenderMetdataLO:false
}

const lastAlignedLO={
    ...INIT_STATE,
    id: "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f",
    label: { en: "Construct and Solve Linear Equation" },
    subject: "https://schema.pearson.com/ns/domains/mathematics"
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
    it('UPDATE_LAST_ALIGNED_LO',()=>{
        let state6= INIT_STATE;
        let label={
            en:"Construct and Solve Linear Equation"
        }
        state6.lastAlignedExternalLO.id ="urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f",
        state6.lastAlignedExternalLO.label = label ,
        state6.lastAlignedExternalLO.subject="https://schema.pearson.com/ns/domains/mathematics"
        expect(metadataReducer(INIT_STATE,{
            type: 'UPDATE_LAST_ALIGNED_LO',
            payload:  lastAlignedLO
        })).toEqual(state6)
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
    it('PROJECT_LEARNING_FRAMEWORKS', () => {
        let state5 = INIT_STATE;
        state5.cypressLF = {};
        state5.externalLF = [];
        expect(metadataReducer(INIT_STATE, {
            type: 'PROJECT_LEARNING_FRAMEWORKS',
            payload:true
            
        })).toEqual(state5);
    })
    it('CURRENT_SLATE_LF', () => {
        let state5 = INIT_STATE;
        state5.currentSlateLF = '';
        expect(metadataReducer(INIT_STATE, {
            type: 'CURRENT_SLATE_LF',
            payload:{currentSlateLF:''}
            
        })).toEqual(state5);
    })
    it('TOGGLE_LO_WARNING_POPUP', () => {
        let state5 = INIT_STATE;
        state5.loWarningPopupData = true;
        expect(metadataReducer(INIT_STATE, {
            type: 'TOGGLE_LO_WARNING_POPUP',
            payload:true
            
        })).toEqual(state5);
    })
    it('DEFAULT_LF', () => {
        let state6 = INIT_STATE;
        state6.defaultLF = '';
        expect(metadataReducer(INIT_STATE, {
            type: 'DEFAULT_LF',
            payload:{defaultLF:''}
            
        })).toEqual(state6);
    })
});

