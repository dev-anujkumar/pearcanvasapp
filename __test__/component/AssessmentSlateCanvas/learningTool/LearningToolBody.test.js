import React from 'react';
import { mount } from 'enzyme';
import LearningToolBody from '../../../../src/component/AssessmentSlateCanvas/learningTool/Components/LearningToolBody';
import { tempFiguresForResults, selectedResult, apiList } from '../../../../fixtures/learningTool'

jest.mock('../../../../src/constants/utility.js', () => ({
    hasReviewerRole: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
}));
describe('Testing Learning Tool LearningToolBody component', () => {
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
        ],
        searchLoading: false,
        showLTBody:true,
        errorFlag:false,
        learningSystems: apiList
    }
    describe('Dropdown Menus Testing-With Results', () => {
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
    describe('Dropdown Menus Testing- errorFlag = true', () => {
        let props1 = {
            ...props,
            errorFlag:true,
        }
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<LearningToolBody {...props1} />);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Render LearningToolBody', () => {
            expect(wrapper.find('.learningToolBody')).toHaveLength(1);
        });
    })
    describe('Dropdown Menus Testing- searchLoading = true', () => {
        let props2 = {
            ...props,
            searchLoading: true,
        }
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<LearningToolBody {...props2} />);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Render LearningToolBody', () => {
            expect(wrapper.find('.learningToolBody')).toHaveLength(1);
        });
    })
    describe('Dropdown Menus Testing- apiResponseLearningTemp.length == 0', () => {
        let props3 = {
            ...props,
            apiResponse: [],
        }
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<LearningToolBody {...props3} />);
        });
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Render LearningToolBody', () => {
            expect(wrapper.find('.learningToolBody')).toHaveLength(1);
        });
    })
});
