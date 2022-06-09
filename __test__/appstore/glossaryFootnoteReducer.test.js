import glossaryFootnoteReducer from '../../src/appstore/glossaryFootnoteReducer';

const INITIAL_STATE = {
    glossaryFootnoteValue:{"type":"","popUpStatus":false},
    glossaaryFootnoteValue: '',
    glossaryFootNoteCurrentValue:'',
    elementIndex : ''
};

const glossaryFootnoteData = { 
    glossaaryFootnoteValue: 'testing footnote value',
    glossaryFootnoteValue: 'testing footnote value',
    glossaryFootNoteCurrentValue : 'checking footnote current value',
    elementIndex :  2 
}

describe('testing glossary Footnote Reducer cases --', () => {
    it('should return the initial state', () => {
        expect(glossaryFootnoteReducer(INITIAL_STATE, {

        })).toEqual(INITIAL_STATE);
    });
    it('get glossaryFootnoteValue', () => {
        let expectedState = {
            ...INITIAL_STATE,
            glossaryFootnoteValue: 'testing footnote value',
            glossaryFootNoteCurrentValue : 'checking footnote current value',
            elementIndex :  2 
        }
        expect(glossaryFootnoteReducer(INITIAL_STATE, {
            type: "OPEN_GLOSSARY_FOOTNOTE",
            payload: glossaryFootnoteData            
        })).toEqual(expectedState);
    })
    it('get glossaryFootnoteValue', () => {
        let expectedState = {
            ...INITIAL_STATE,
            glossaryFootnoteValue: 'testing footnote value'
        }
        expect(glossaryFootnoteReducer(INITIAL_STATE, {
            type: "UPDATE_NEW_ELEMENT_WORK_ID",
            payload: glossaryFootnoteData            
        })).toEqual(expectedState);
    })
    it('get glossaryFootnoteValue', () => {
        let expectedState = {
            ...INITIAL_STATE,
            glossaryFootNoteCurrentValue : 'checking footnote current value',
        }
        expect(glossaryFootnoteReducer(INITIAL_STATE, {
            type: "UPDATE_CURRENT_VALUE",
            payload: glossaryFootnoteData            
        })).toEqual(expectedState);
    })
});