import glossaryFootnoteReducer from '../../src/appstore/glossaryFootnoteReducer';

const initialState = {
    glossaryFootnoteValue: '',
    glossaryFootNoteCurrentValue : '',
    elementIndex :  0
};

const glossaryFootnoteData = { 
    glossaryFootnoteValue: 'testing footnote value',
    glossaryFootNoteCurrentValue : 'checking footnote current value',
    elementIndex :  2 
}

describe('testing glossary Footnote Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(glossaryFootnoteReducer(initialState, {

        })).toEqual(initialState);
    });
    xit('get glossaryFootnoteValue', () => {
        let expectedState = {
            ...initialState,
            glossaryFootnoteValue: 'testing footnote value',
            glossaryFootNoteCurrentValue : 'checking footnote current value',
            elementIndex :  2 
        }
        expect(glossaryFootnoteReducer(initialState, {
            type: "OPEN_GLOSSARY_FOOTNOTE",
            payload: glossaryFootnoteData            
        })).toEqual(expectedState);
    })

});