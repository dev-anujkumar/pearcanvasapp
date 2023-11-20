
/**************************Import Plugins**************************/
import React from 'react';
import axios from 'axios';
/**************************Import Modules**************************/
import config from '../../../src/config/config';
import * as autoNumberActions from '../../../src/component/FigureHeader/AutoNumberActions';
import { popupCutCopyParentData } from '../../../src/component/FigureHeader/AutoNumberActions';
/*************************Import Constants*************************/
import { SET_AUTO_NUMBER_TOGGLE, GET_ALL_AUTO_NUMBER_ELEMENTS, SET_AUTO_NUMBER_SEQUENCE, GET_TOC_AUTO_NUMBERING_LIST } from "../../../src/constants/Action_Constants";
import { mockFiguresAPIResponse, mockNumberedElements, mockAutoNumberingDetails, mockAudioAPIResponse, mockVideoAPIResponse } from './AutoNumberApiTestData';

jest.mock('axios');
jest.mock('../../../src/component/FigureHeader/mediaElementDataMapper.js', () => {
    return {
        mediaElementAPI_Handler: () => {
            return mockNumberedElements
        }
    }
})
describe('-----------------Testing AutoNumber Actions-----------------', () => {
    describe('Test-1----------------- fetchProjectFigures-----------------', () => {
        const getState=  () => {
            return {
                autoNumberReducer: {
                    isAutoNumberingEnabled: false,
                    autoNumberedElements: {
                        imagesList: [],
                        tablesList: [],
                        equationsList: [],
                        audiosList: [],
                        videosList: []
                    },
                    autoNumberingDetails: {},
                    autoNumberElementsIndex: {
                        figureImageIndex: {},
                        tableIndex: {},
                        equationsIndex: {},
                        audioIndex: {},
                        videoIndex: {}
                    },
                    slateFigureList: [],
                    autoNumberOption: ''
                }
            }
        }
        it('Test-1.1---fetchProjectFigures-Then- with res.data', () => {
            let elementType = "IMAGE";
            let responseData = {
                data: mockFiguresAPIResponse
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.1---fetchProjectFigures-Then- with res.data', () => {
            let elementType = "frontMatter";
            let responseData = {
                data: mockFiguresAPIResponse
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.1---fetchProjectFigures-Then- with res.data', () => {
            let elementType = "backMatter";
            let responseData = {
                data: mockFiguresAPIResponse
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.2---fetchProjectFigures-Catch', () => {
            let elementType = "IMAGE";
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.reject({}));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.3---fetchProjectFigures-Then- with res.data', () => {
            let elementType = "AUDIO";
            let responseData = {
                data: mockAudioAPIResponse
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
        it('Test-1.4---fetchProjectFigures-Then- with res.data', () => {
            let elementType = "VIDEO";
            let responseData = {
                data: mockVideoAPIResponse
            }
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_ALL_AUTO_NUMBER_ELEMENTS);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'fetchProjectFigures');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            autoNumberActions.fetchProjectFigures(elementType)(dispatch, getState);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-2----------------- getAutoNumberSequence-----------------', () => {
        it('Test-2.1---getAutoNumberSequence---', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_AUTO_NUMBER_SEQUENCE);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'getAutoNumberSequence');
            autoNumberActions.getAutoNumberSequence(mockNumberedElements,dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-3----------------- setTocContainersAutoNumberList-----------------', () => {
        it('Test-3.1---setTocContainersAutoNumberList---', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(GET_TOC_AUTO_NUMBERING_LIST);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'setTocContainersAutoNumberList');
            autoNumberActions.setTocContainersAutoNumberList(mockAutoNumberingDetails)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
    describe('Test-4----------------- isAutoNumberEnabled-----------------', () => {
        it('Test-4.1---isAutoNumberEnabled---', () => {
            let dispatch = (obj) => {
                expect(obj.type).toBe(SET_AUTO_NUMBER_TOGGLE);
            }
            const spyFunction = jest.spyOn(autoNumberActions, 'isAutoNumberEnabled');
            autoNumberActions.isAutoNumberEnabled(true, true)(dispatch);
            expect(spyFunction).toHaveBeenCalled();
            spyFunction.mockClear();
        });
    });
})