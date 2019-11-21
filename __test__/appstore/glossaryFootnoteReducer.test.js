import glossaryFootnoteReducer from '../../src/appstore/glossaryFootnoteReducer';

const initialState = {
    glossaryFootnoteValue: { "type": "", "popUpStatus": false }
};

const glossaryFootnoteData = { "type": "Glossary", "popUpStatus": "true" }
const expectedState = {    glossaryFootnoteValue: { "type": "Glossary", "popUpStatus": "true" }}

xdescribe('testing glossary Footnote Reducer cases --', () => {

    it('should return the initial state', () => {
        expect(glossaryFootnoteReducer(undefined, {})).toEqual(initialState);
    });
    it('get glossaryFootnoteValue', () => {
        expect(glossaryFootnoteReducer(initialState, {
            type: "OPEN_GLOSSARY_FOOTNOTE",
            payload: glossaryFootnoteData            
        })).toEqual(expectedState);
    })

});

