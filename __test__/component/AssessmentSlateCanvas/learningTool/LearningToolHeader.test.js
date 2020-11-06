import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import LearningToolHeader from '../../../../src/component/AssessmentSlateCanvas/learningTool/Components/LearningToolHeader';
import { learningSystemList, disciplines } from '../../../../fixtures/learningTool'

jest.mock('../../../../src/component/DropdownMenu', () => {
    return function () {
        return (<ul className="dropdown-parent"><li></li></ul>)
    }
});
// jest.mock('../../../../src/component/InputSearch', () => {
//     return function () {
//         return (<input className="learningToolSearchBar" id="learningToolSearchBar" value='Test'on/>)
//     }
// });
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
                learningSystems: learningSystemList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines,
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
                learningSystems: learningSystemList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines,
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
    xdescribe('handleDropdownChange Testing', () => {
        let newProps = {
            searchProps: {
                showError: true,
                searchTextCondition: 'Test Condition',
                validateSearch: jest.fn()
            },
            dropdownProps: {
                selectedTypeValue: "accounting-sims",
                setlearningAppType: jest.fn(),
                learningSystems: learningSystemList,
                setlearningToolDiscipline: jest.fn(),
                apiResponseForDis: disciplines,
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
            wrapper = shallow(<LearningToolHeader {...newProps} />);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        xit('Test handleDropdownChange', () => {
            const setOpenAppTypeDropdown = jest.fn();
            const handleClick = jest.spyOn(React, "useState");
            handleClick.mockImplementation(openAppTypeDropdown => [openAppTypeDropdown, setOpenAppTypeDropdown]);
            expect(setOpenAppTypeDropdown).toBeTruthy();
            wrapper.find('.learning-tool-header tr.row-2 td ul.dropdown-parent li').simulate('change', event);            
            expect(wrapper.find('.learning-tool-header tr.row-2 td ul.dropdown-parent li').at(0)).toHaveLength(1);
        });
    });
});
