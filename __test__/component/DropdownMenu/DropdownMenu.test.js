import * as menu from '../../../src/component/DropdownMenu/Dropdown.jsx';
import { disciplines, learningSystemList } from '../../../fixtures/learningTool';
import { MockUsageTypeList_Data } from '../../../fixtures/AssessmentSlateCanvasTestingData.js';
jest.mock('../../../src/constants/utility.js', () => ({
    hasReviewerRole: jest.fn()
}))

describe('Testing DropdownMenu component', () => {
    it('Render DropdownMenu - Discipline', () => {
        let props = {
            type: 'Discipline',
            dropdownList: disciplines.options,
            dropdownClass: 'learning-tool-dropdown',
            clickHandlerFn: jest.fn()
        }
        menu.Dropdown(props);
        expect(props.type).toBe('Discipline');
    })
    it('Render DropdownMenu - Learning App Type', () => {
        let nextProps = {
            type: 'Learning App Type',
            dropdownList: Object.values(learningSystemList),
            dropdownClass: 'learning-tool-dropdown',
            clickHandlerFn: jest.fn()
        }
        menu.Dropdown(nextProps);
        expect(nextProps.type).toBe('Learning App Type');
    })
    it('Render DropdownMenu - Default', () => {
        let nextProps = {
            type: 'UsageType',
            dropdownList: MockUsageTypeList_Data,
            dropdownClass: 'usageType-dropdown',
            clickHandlerFn: jest.fn()
        }
        menu.Dropdown(nextProps);
        expect(nextProps.type).toBe('UsageType');
    })
})