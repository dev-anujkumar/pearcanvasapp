import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AudioTinyMceGlossary from '../../../src/component/AudioTinyMceGlossary/AudioTinyMceGlossary'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('testing AudioTinyMceGlossary component', () => {
    const initialState = {
        audioReducer: {
            openAudioGlossaryPopup: true,
            addAudioGlossaryPopup: false
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: {
                popUpStatus: true
            }
        }
    };
    let store = mockStore(initialState);
    let props = {
        handleAudioToggle: jest.fn(),
        handleAudioOpenToggle: jest.fn()
    }

    let wrapper = mount(<Provider store={store}><AudioTinyMceGlossary {...props} /></Provider>, { attachTo: document.body });
    let instance = wrapper.instance();
    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
        expect(instance).toBeDefined();
    })
    it('check button handleAudioToggle', () => {
        wrapper.find('#audioNarration').at(0).simulate('click');
        expect(props.handleAudioToggle).toHaveBeenCalled();

    })
})

describe('testing AudioTinyMceGlossary component for audioNarrationEnable', () => {
    const initialState = {
        audioReducer: {
            openAudioGlossaryPopup: false,
            addAudioGlossaryPopup: true
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: {
                popUpStatus: true
            }
        }
    };
    let store = mockStore(initialState);
    let props = {
        handleAudioToggle: jest.fn(),
        handleAudioOpenToggle: jest.fn()
    }

    let wrapper = mount(<Provider store={store}><AudioTinyMceGlossary {...props} /></Provider>);
   
    it('check button handleAudioOpenToggle', () => {
        wrapper.find('#audioNarrationEnable').at(0).simulate('click');
        expect(props.handleAudioOpenToggle).toHaveBeenCalled();

    })
})