import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import FigureTinyMceGlossary from '../../../src/component/ElementFigure/FigureTinyMceGlosaary.jsx'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('testing FigureTinyMceGlossary component', () => {
    const initialState = {
        appStore: {
            addfigureGlossarypopup: false
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: {
                popUpStatus: true
            }
        }
    };
    let store = mockStore(initialState);
    let props = {
        handleFigureToggle: jest.fn()
    }

    let wrapper = mount(<Provider store={store}><FigureTinyMceGlossary {...props} /></Provider>, { attachTo: document.body });
    let instance = wrapper.instance();
    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
        expect(instance).toBeDefined();
    })
    it('check button handleFigureToggle', () => {
        wrapper.find('#audioNarration').at(0).simulate('click');
        expect(props.handleFigureToggle).toHaveBeenCalled();

    })
})

describe('testing FigureTinyMceGlossary component for audioNarrationEnable', () => {
    const initialState = {
        appStore: {
            addfigureGlossarypopup: true
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: {
                popUpStatus: true
            }
        }
    };
    let store = mockStore(initialState);
    let props = {
        handleFigureToggle: jest.fn(),
    }

    let wrapper = mount(<Provider store={store}><FigureTinyMceGlossary {...props} /></Provider>);
    let instance = wrapper.instance();

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
        expect(instance).toBeDefined();
    })
})