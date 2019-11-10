import metadataReducer from '../../src/appstore/metadataReducer';

const INIT_STATE = {
    currentSlateLOData: "",
    slateTagEnable: false,
    showModule:false,
    currentSlateLODataMath:""
}

const currentSlateLOData = { currentSlateLOData: "",
slateTagEnable: false,
showModule:false,
currentSlateLODataMath:""
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
            
        })).toEqual(currentSlateLOData);
    })

});

