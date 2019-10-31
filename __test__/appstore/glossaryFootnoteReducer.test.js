import glossaryFootnoteReducer from '../../src/appstore/glossaryFootnoteReducer';

const initialState = {
    glossaryFootnoteValue: { "type": "", "popUpStatus": false }
};

const glossaryFootnoteData = { "type": "Glossary", "popUpStatus": "true" }

describe('testing glossary Footnote Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(glossaryFootnoteReducer(undefined, {})).toEqual(initialState);
    });
    it('get glossaryFootnoteValue', () => {
        glossaryFootnoteReducer(initialState, {
            type: "OPEN_GLOSSARY_FOOTNOTE",
            payload: {
                glossaryFootnoteValue: glossaryFootnoteData
            }
        })
    })

});

