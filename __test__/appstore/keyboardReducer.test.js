import {keyboardReducer} from '../../src/appstore/keyboardReducer';
import { SELECT_ELEMENT } from "../../src/constants/Action_Constants";

    const initialState =  {
        selectedElement: 'cypress-keyboard-1',
        cursorPosition : 0,
        elementList : []
    }
describe("Testing LOB permissions", () => {
    it('should return the initial state', () => {
        expect(keyboardReducer(initialState, {
        })).toEqual(initialState);
    });
    it('SELECT_ELEMENT', () => {
        let output = {
            ...initialState,
            selectedElement: {
            keyboardReducer: {
                selectedElement:' cypress-keyboard-0'
            },
        },
        }
        expect(keyboardReducer(initialState, {
            type: SELECT_ELEMENT,
            payload: {
                keyboardReducer: {
                    selectedElement:' cypress-keyboard-0'
                },
            }
        })).toEqual(output)
    });

});