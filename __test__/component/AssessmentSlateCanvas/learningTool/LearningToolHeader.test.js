import React from 'react';
import { mount } from 'enzyme';
import LearningToolHeader from '../../../../src/component/AssessmentSlateCanvas/learningTool/Components/LearningToolHeader';
import { apiList, disciplines } from '../../../../fixtures/learningTool'

jest.mock('../../../../src/constants/utility.js', () => ({
    hasReviewerRole: jest.fn()
}));
describe('Testing Learning Tool LearningToolHeader component', () => {
    describe('Dropdown Menus Testing', () => {
        let props = {
            searchProps: {
                showError: false,
                searchTextCondition: 'Test Condition',
                validateSearch: jest.fn()
            },
            dropdownProps: {
                selectedTypeValue: "helpdesk",
                setlearningAppType: jest.fn(),
                learningSystems: apiList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines.options,
                showDisFilterValues: true
            },
            learningToolSearchAction: jest.fn()
        }
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        }
        let wrapper;

        beforeEach(() => {
            wrapper = mount(<LearningToolHeader {...props} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });
        it('Render LearningToolHeader', () => {
            wrapper.find('.learning-tool-header button.learning-tool-button').simulate('click', event);
            expect(wrapper.find('.learning-tool-header button.learning-tool-button')).toHaveLength(1);
        })
        it('Test toggleAppTypeDropdown', () => {
            wrapper.find('.learning-tool-header tr.row-2 div.learningAppType').at(0).simulate('click', event);
            expect(wrapper.find('.learning-tool-header tr.row-2 div.learningAppType').at(0)).toHaveLength(1);
        })
        it('Test toggleDisciplineDropdown', () => {
            wrapper.find('.learning-tool-header tr.row-2 div.learningAppType').at(1).simulate('click', event);
            expect(wrapper.find('.learning-tool-header tr.row-2 div.learningAppType').at(1)).toHaveLength(1);
        })
    })
    describe('handleKeywordChange Testing', () => {
        let newProps = {
            searchProps: {
                showError: true,
                searchTextCondition: 'Test Condition',
                validateSearch: jest.fn()
            },
            dropdownProps: {
                selectedTypeValue: "helpdesk",
                setlearningAppType: jest.fn(),
                learningSystems: apiList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines.options,
                showDisFilterValues: true
            },
            learningToolSearchAction: jest.fn()
        }
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            target: {
                value: 'Test'
            }
        }
        let wrapper;
        beforeEach(() => {
            wrapper = mount(<LearningToolHeader {...newProps} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Test handleKeywordChange', () => {
            wrapper.find('.learning-tool-header tr.row-2 td input#learningToolSearchBar').at(0).simulate('change', event);
            expect(wrapper.find('.learning-tool-header tr.row-2 td input#learningToolSearchBar').at(0)).toHaveLength(1);
        })
    })
    describe('handleDropdownChange Testing', () => {
        let newProps = {
            searchProps: {
                showError: true,
                searchTextCondition: 'Test Condition',
                validateSearch: jest.fn()
            },
            dropdownProps: {
                selectedTypeValue: "accounting-sims",
                setlearningAppType: jest.fn(),
                learningSystems: apiList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines.options,
                showDisFilterValues: true,
                showAppTypeValues: true
            },
            learningToolSearchAction: jest.fn()
        }
        let event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn()
        }
        let nextWrapper;
        beforeEach(() => {
            nextWrapper = mount(<LearningToolHeader {...newProps} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('Test handleDropdownChange - Discipline', () => {
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-disc').simulate('click', event);
            expect(nextWrapper.find('.learning-tool-header tr.row-2 td.data-disc ul.dropdown-parent li').at(0)).toHaveLength(1);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-disc ul.dropdown-parent li').at(0).simulate('click', event);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-disc').simulate('click', event);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-disc ul.dropdown-parent li').at(1).simulate('click', event);
        });
        it('Test handleDropdownChange -Learning App Type', () => {
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-apptype').simulate('click', event);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-apptype ul.dropdown-parent li').at(0).simulate('click', event);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-apptype').simulate('click', event);
            expect(nextWrapper.find('.learning-tool-header tr.row-2 td.data-apptype ul.dropdown-parent li').at(0)).toHaveLength(1);
            nextWrapper.find('.learning-tool-header tr.row-2 td.data-apptype ul.dropdown-parent li').at(1).simulate('click', event);
        });
    });
});
