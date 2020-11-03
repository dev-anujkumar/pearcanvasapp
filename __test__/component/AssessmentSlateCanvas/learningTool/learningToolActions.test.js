import * as actions from '../../../../src/component/AssessmentSlateCanvas/learningTool/learningToolActions';
import axios from 'axios';
import {
    LT_API_RESULT,
    LT_API_RESULT_FAIL,
    SELECTED_FIGURE,
    PAGINATION,
    LEARNING_TOOL_DIS_VALUE,
    TOGGLE_LT_POPUP,
    GET_DISCIPLINE,
    REMOVE_SELECTED_DATA,
    LINK_BUTTON_DISABLE,
    GET_LEARNING_SYSTEMS
} from '../../../../src/constants/Action_Constants';
import { tempFiguresForResults, disciplines, selectedResult, learningSystemList } from '../../../../fixtures/learningTool'
jest.mock('axios');
jest.mock('../../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn()
}))

describe('TestS Learning_Tool_ActionS', () => {
    it('Testing------- fetchLearningSystems', () => {
        let expectedResult = {
            type: GET_LEARNING_SYSTEMS,
            payload: {
                showDisFilterValues: true,
                learningSystems: learningSystemList
            }
        }
        let result = actions.fetchLearningSystems(learningSystemList)
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(GET_LEARNING_SYSTEMS);
    });
    it('Testing------- linkDisable', () => {
        let expectedResult = {
            type: LINK_BUTTON_DISABLE
        }
        let result = actions.linkDisable()
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(LINK_BUTTON_DISABLE);
    });
    it('Testing------- removeSelectedData', () => {
        let expectedResult = {
            type: REMOVE_SELECTED_DATA
        }
        let result = actions.removeSelectedData()
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(REMOVE_SELECTED_DATA);
    });
    it('Testing------- getDiscipline', () => {
        let expectedResult = {
            type: GET_DISCIPLINE,
            payload: {
                showDisFilterValues: true,
                apiResponseForDis: disciplines
            }
        }
        let result = actions.getDiscipline(disciplines)
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(GET_DISCIPLINE);
    });
    it('Testing------- openLtAction', () => {
        let expectedResult = {
            type: TOGGLE_LT_POPUP,
            payload: {
                toggleLT: true
            }
        }
        let result = actions.openLtAction()
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(TOGGLE_LT_POPUP);
    });
    it('Testing------- closeLtAction', () => {
        let expectedResult = {
            type: TOGGLE_LT_POPUP,
            payload: {
                toggleLT: false
            }
        }
        let result = actions.closeLtAction()
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(TOGGLE_LT_POPUP);
    });
    it('Testing------- learningToolDisFilterAction', () => {
        let expectedResult = {
            type: LEARNING_TOOL_DIS_VALUE,
            payload: {
                learningToolDisValue: 'art'
            }
        }
        let result = actions.learningToolDisFilterAction('art')
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(LEARNING_TOOL_DIS_VALUE);
    });
    it('Testing------- paginationFunctionAction', () => {
        let expectedResult = {
            type: PAGINATION,
            payload: {
                numberOfRows: 25
            }
        }
        let result = actions.paginationFunctionAction(25)
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(PAGINATION);
    });
    it('Testing------- selectedFigureAction', () => {
        let expectedResult = {
            type: SELECTED_FIGURE,
            payload: {
                selectedFigure: selectedResult
            }
        }
        let result = actions.selectedFigureAction(selectedResult)
        expect(result).toEqual(expectedResult);
        expect(expectedResult.type).toBe(SELECTED_FIGURE);
    });
    describe('Testing------- openLTFunction', () => {
        it('Testing------- TAXONOMIC_ID_DISCIPLINES', () => {
            let responseData = { data: disciplines }
            let dispatch = (obj) => {
                if (obj && obj.type === GET_DISCIPLINE) {
                    expect(obj.payload.showDisFilterValues).toEqual(true);
                    expect(obj.payload.apiResponseForDis).toEqual(disciplines);
                }
            }
            const spyFunction = jest.spyOn(actions, 'openLTFunction');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            actions.openLTFunction('disciplines')(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('disciplines');
            spyFunction.mockClear();
        });
        it('Testing------- TAXONOMIC_ID_LEARNING_SYSTEM', () => {
            let dispatch = (obj) => {
                if (obj && obj.type === GET_LEARNING_SYSTEMS) {
                    expect(obj.payload.showDisFilterValues).toEqual(true);
                    expect(obj.payload.learningSystems).toEqual(learningSystemList);
                }
            }
            const spyFunction = jest.spyOn(actions, 'openLTFunction');
            actions.openLTFunction('learningsystem')(dispatch);
            expect(spyFunction).toHaveBeenCalledWith('learningsystem');
            spyFunction.mockClear();
        });
        it('Testing------- TAXONOMIC_ID_LEARNING_SYSTEM', () => {
            let dispatch = (obj) => {
                if (obj && obj.type === LT_API_RESULT_FAIL) {
                    expect(obj.payload.showDisFilterValues).toEqual(true);
                    expect(obj.payload.learningSystems).toEqual(learningSystemList);
                }
            }
            axios.get = jest.fn(() => Promise.reject({}));
            const spyFunction = jest.spyOn(actions, 'openLTFunction');
            actions.openLTFunction('learningsystem')(dispatch);
            spyFunction.mockClear();
        });
    })
    describe('Testing------- learningToolSearchAction', () => {
        it('Testing------- learningToolSearchAction', () => {
            let learningSystem = 'knowdl',
                learningAppType = 'helpdesk',
                searchLabel = 'Title',
                searchKeyword = 'Test'
            let responseData = { data: tempFiguresForResults }
            let dispatch = (obj) => {
                if (obj && obj.type === LT_API_RESULT) {
                    expect(obj.payload.showDisFilterValues).toEqual(true);
                    expect(obj.payload.apiResponse).toEqual(disciplines);
                    expect(obj.payload.showLTBody).toEqual(tempFiguresForResults);
                }
            }
            const spyFunction = jest.spyOn(actions, 'learningToolSearchAction');
            axios.get = jest.fn(() => Promise.resolve(responseData));
            actions.learningToolSearchAction(learningSystem, learningAppType, searchLabel, searchKeyword)(dispatch);
            expect(spyFunction).toHaveBeenCalledWith(learningSystem, learningAppType, searchLabel, searchKeyword);
            spyFunction.mockClear();
        });
    })
})
