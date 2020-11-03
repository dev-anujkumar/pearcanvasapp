import React from 'react';
import { mount } from 'enzyme';
import LearningToolBody from '../../../../src/component/AssessmentSlateCanvas/learningTool/Components/LearningToolBody';
import { tempFiguresForResults, selectedResult } from '../../../../fixtures/learningTool'

jest.mock('../../../../src/constants/utility.js', () => ({
    hasReviewerRole: jest.fn()
}));
describe('Testing Learning Tool LearningToolBody component', () => {
    describe('Dropdown Menus Testing-With Results', () => {
        let props = {
            apiResponse: tempFiguresForResults,
            selectedResultData: selectedResult,
            learningToolPageLimit: [25,50],
            selectedFigure: jest.fn(),
            learningToolTableHeaders: [
                'Learning App Type',
                'Discipline',
                'Title',
                'Date Modified',
                'Keyword(s)',
                'Template ID'
            ]
        }
        let event = {
            preventDefault: jest.fn()
        }
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<LearningToolBody {...props} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
        it('Render LearningToolBody', () => {
            expect(wrapper.find('.learningToolResultsTableHeader')).toHaveLength(1);
            expect(wrapper.find('.learningToolBody table.learningToolTable')).toHaveLength(1);
            expect(wrapper.find('.learningToolBody')).toHaveLength(1);
        });
        it('Test paginationFunction', () => {
            wrapper.find('.learningToolResultsTableHeader select.learningToolPages').at(0).simulate('change', event);
        });
        it('Test prevPage', () => {
            wrapper.find('.paginationButtons button.leftPage').simulate('click', event);
        });
        it('Test nextPage', () => {
            wrapper.find('.paginationButtons button.rightPage').simulate('click', event);
        });
    })
    describe('LearningToolBody Testing-ErrorComp', () => {
        let props = {
            apiResponse: [],
            selectedResultData: {},
            learningToolPageLimit: [25,50],
            selectedFigure: jest.fn(),
            learningToolTableHeaders: [
                'Learning App Type',
                'Discipline',
                'Title',
                'Date Modified',
                'Keyword(s)',
                'Template ID'
            ]
        }
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<LearningToolBody {...props} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
        it('Render LearningToolBody-ErrorComp', () => {
            expect(wrapper.find('.learningToolResultsTableHeader')).toHaveLength(1);
            expect(wrapper.find('.learningToolBody table.learningToolTable')).toHaveLength(1);
            expect(wrapper.find('.learningToolBody p.ErrorComp')).toHaveLength(1);
        });
    })
});
