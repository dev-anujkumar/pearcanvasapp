import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import BlockMathCode from '../../../src/component/ElementFigure/BlockMathCode';
import { mathBlockContentWithOutData, mathBlockContentWithData, codeBlockContentWithOutData, codeBlockContentWithData } from '../../../fixtures/BlockMathCodeTestingData';
import config from '../../../src/config/config';
import cypressConfig from '../../../src/config/cypressConfig';

describe('Testing BlockMathCode Component', () => {
    const mockAutoNumberReducerEmpty = {
        isAutoNumberingEnabled: false,
        autoNumberedElements: {
            imagesList: [],
            tablesList: [],
            equationsList: [],
            audiosList:[],
            videosList:[]
        },
        autoNumberingDetails: {},
        autoNumberElementsIndex: {
            figureImageIndex: {},
            tableIndex: {},
            equationsIndex: {},
            audioIndex: {},
            videoIndex: {}
        },
        slateFigureList:[],
        autoNumberOption: ''
    }
    let initialState = {
        alfrescoReducer: {
            alfrescoAssetData: {},
            elementId: "urn",
            alfrescoListOption: [],
            launchAlfrescoPopup: true,
            editor: true,
            Permission: false
        },
        appStore: {
            figureDropdownData: {
                audio: ["No Label", "Custom"],
                image: ["Figure", "Table", "Equation"],
                smartlinks: ["No Label", "Custom"],
                video: ["No Label", "Custom"]
            }
        },
        projectMetadata:{},
        autoNumberReducer: mockAutoNumberReducerEmpty,
        toolbarReducer : {
            spellCheckToggle : false
        }
    }
    const store = mockStore(initialState);
    config.figureFieldsPlaceholders = cypressConfig.figureFieldsPlaceholders
    let commonProps = {
        onFigureImageFieldFocus: jest.fn(),
        onFigureImageFieldBlur: jest.fn(),
        openGlossaryFootnotePopUp: jest.fn(),
        handleFocus: jest.fn(),
        handleBlur: jest.fn(),
        glossaaryFootnotePopup: jest.fn()
    }
    describe('Testing rendering of BlockMathCode when it renders Math Block Content', () => {
        it('BlockMathCode renders with out any data without crashing', () => {
            let props = {
                ...commonProps,
                ...mathBlockContentWithOutData
            }
            let component = mount(<Provider store={store}><BlockMathCode {...props} /></Provider>);
            expect(component.find('div.floating-math-content-group')).toHaveLength(1);
            expect(component.find('label.floating-math-content')).toHaveLength(1);
        })
        it('BlockMathCode renders with data without crashing', () => {
            let props = {
                ...commonProps,
                ...mathBlockContentWithData
            }
            let component = mount(<Provider store={store}><BlockMathCode {...props} /></Provider>);
            expect(component.find('div.floating-math-content-group')).toHaveLength(1);
            expect(component.find('label.transition-none')).toHaveLength(1);
        })
    })
    describe('Testing rendering of BlockMathCode when it renders Code Block Content', () => {
        it('BlockMathCode renders with out any data without crashing', () => {
            let props = {
                ...commonProps,
                ...codeBlockContentWithOutData
            }
            let component = mount(<Provider store={store}><BlockMathCode {...props} /></Provider>);
            expect(component.find('div.floating-code-content-group')).toHaveLength(1);
            expect(component.find('label.floating-code-content')).toHaveLength(1);
        })
        it('BlockMathCode renders with data without crashing', () => {
            let props = {
                ...commonProps,
                ...codeBlockContentWithData
            }
            let component = mount(<Provider store={store}><BlockMathCode {...props} /></Provider>);
            expect(component.find('div.floating-code-content-group')).toHaveLength(1);
            expect(component.find('label.transition-none')).toHaveLength(1);
        })
    })
})