
import errorPopupReducer from '../../src/appstore/errorPopupReducer';
import {  ERROR_POPUP,
    MULTIPLE_LINE_POETRY_ERROR_POPUP,
    ELM_PORTAL_API_ERROR,
    ERROR_API_POPUP } from "../../src/constants/Action_Constants";

    const INITIAL_STATE = {
        show:false, 
        message:'The element you tried to create or update did not save. Please try again.',
        isElmApiError:"",
      }
      const INITIAL_ACTION = {
        type: '',
        payload: {}
      }

describe("Testing LOB permissions", () => {
    it('should return the initial state', () => {
        expect(errorPopupReducer(INITIAL_STATE, {
        })).toEqual(INITIAL_STATE);
    });
    it('ERROR_POPUP', () => {
        let output = {
            ...INITIAL_STATE,
            show : false,
            message : 'The element you tried to create or update did not save. Please try again.'
        }
        expect(errorPopupReducer(INITIAL_STATE, {
            type:  ERROR_POPUP,
            payload: {
                show : false,
            message : 'The element you tried to create or update did not save. Please try again.'
            }
        })).toEqual(output)
    });

    it(' MULTIPLE_LINE_POETRY_ERROR_POPUP', () => {
        let output = {
            ...INITIAL_STATE,
            show : false,
            message : 'The element you tried to create or update did not save. Please try again.'
        }
        expect(errorPopupReducer(INITIAL_STATE, {
            type:   MULTIPLE_LINE_POETRY_ERROR_POPUP,
            payload: {
                show : false,
                message : 'The element you tried to create or update did not save. Please try again.'
            }
        })).toEqual(output)
    });
    it(' ELM_PORTAL_API_ERROR', () => {
        let output = {
            ...INITIAL_STATE,
            show : undefined,
            message :  undefined,
            isElmApiError: "",
        }
        expect(errorPopupReducer(INITIAL_STATE, {
            type:   ELM_PORTAL_API_ERROR,
            payload: {
                show : undefined,
                message : undefined,
                isElmApiError: "",
            }
        })).toEqual(output)
    });
    it(' ERROR_API_POPUP', () => {
        let output = {
            ...INITIAL_STATE,
            show : false,
            message : 'The element you tried to create or update did not save. Please try again.',
            isElmApiError: "",
        }
        expect(errorPopupReducer(INITIAL_STATE, {
            type:   ERROR_API_POPUP,
            payload: {
                show : false,
                message : 'The element you tried to create or update did not save. Please try again.',
                isElmApiError: "",
            }
        })).toEqual(output)
    });
});

    
   