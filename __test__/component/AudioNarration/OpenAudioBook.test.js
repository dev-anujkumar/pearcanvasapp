import React from 'react';
import ReactDOM from 'react-dom';
import { mount , shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import mockAxios from 'axios';
import OpenAudioBook from '../../../src/component/AudioNarration/OpenAudioBook.jsx'
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let hasReviewerRole = jest.fn(() => false)
const initialState = {
    audioReducer: {
        audioData: {
            data: [{
                location:'US',
                title:{
                    en: 'en'
                }
            }]
        }
    }
};
let store = mockStore(initialState);
describe('Testing OpenAudioBook component', () => {
    let props = {
        closeAudioBookDialog: jest.fn(),
        deleteAudioNarrationForContainer:  jest.fn(),
        showAudioRemovePopup : true
    }
    const e = {
        target: {
            tagName: "p"
        },
        stopPropagation() { }
    }
    mockAxios.post = jest.fn().mockResolvedValueOnce('');

    const narrativeAudio = mount(<Provider store={store}><OpenAudioBook {...props} /></Provider>);
    
    narrativeAudio.find('.close-icon-audio').simulate('click');
    
    let narrativeAudioInstance = narrativeAudio.find('OpenAudioBook').instance();
    const spyProcessConfirmation = jest.spyOn(narrativeAudioInstance, 'processConfirmation')
    const spyHandleClick = jest.spyOn(narrativeAudioInstance, 'handleClick')


    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('onClick-default case', () => {
        narrativeAudioInstance.processConfirmation("not-test");
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyProcessConfirmation).toHaveBeenCalled()
        spyProcessConfirmation.mockClear()
          
    })
    it('Blur Dropdown', () => {
        narrativeAudio.find('.audiodropdown').simulate('blur');
        // narrativeAudioInstance.processConfirmation("not-test");
        // narrativeAudioInstance.forceUpdate();
        // narrativeAudio.update();
        expect(spyHandleClick).toHaveBeenCalled()
        spyHandleClick.mockClear()
          
    })
    
})