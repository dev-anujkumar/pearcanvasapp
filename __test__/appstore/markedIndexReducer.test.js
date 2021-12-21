import markedIndexReducer from '../../src/appstore/markedIndexReducer';

const initialState = {
    markedIndexValue: "",
    markedIndexCurrentValue: "",
    elementIndex: "",
    markedIndexGlossary: "",
    crossReferenceValues: []
};

describe('testing marked index reducer cases --', () => {
    it('should return the initial state', () => {
        expect(markedIndexReducer(initialState, {})).toEqual(initialState);
    });

    it('should return the initial state', () => {
        let expectedState = {
            markedIndexValue: { "type": "", "popUpStatus": false },
            markedIndexCurrentValue: '',
            elementIndex: '',
            markedIndexGlossary: {popUpStatus: false,  indexEntries: {}, markedIndexEntryURN: '' },
            crossReferenceValues: []
        }
        expect(markedIndexReducer()).toEqual(expectedState);
    });

    it('Should return updated state when "OPEN_MARKED_INDEX" case is executed', () => {
        const markedIndexData = {
            markedIndexValue: "Marked index value",
            markedIndexCurrentValue: "Marked index current value",
            elementIndex: 3,
            markedIndexGlossary: "Marked index inside glossary"
        };

        const expectedState = {
            ...initialState,
            markedIndexValue: "Marked index value",
            markedIndexCurrentValue: "Marked index current value",
            elementIndex: 3,
            markedIndexGlossary: "Marked index inside glossary"
        }
        expect(markedIndexReducer(initialState, {
            type: "OPEN_MARKED_INDEX",
            payload: markedIndexData            
        })).toEqual(expectedState);
    });

    it('Should return updated state when "OPEN_MARKED_INDEX" case is executed', () => {
        const markedIndexData = {
            markedIndexCurrentValue: "New arked index current value",
            markedIndexGlossary: "New Marked index inside glossary"
        };

        let expectedState = {
            ...initialState,
            markedIndexCurrentValue: "New arked index current value",
            markedIndexGlossary: "New Marked index inside glossary"
        }
        expect(markedIndexReducer(initialState, {
            type: "OPEN_MARKED_INDEX_ON_GLOSSARY",
            payload: markedIndexData            
        })).toEqual(expectedState);
    });

    it('Should update cross-reference values in the store', () => {
        const markedIndexData = {
            crossReferenceValues: [ 'index', 'sub-index']
        };

        let expectedState = {
            ...initialState,
            crossReferenceValues: [ 'index', 'sub-index']
        }
        expect(markedIndexReducer(initialState, {
            type: "UPDATE_CROSS_REFERENCE_VALUES",
            payload: markedIndexData            
        })).toEqual(expectedState);
    })
});