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
const initialState = {
    audioReducer: {
        audioData: {}
    }
};
let store = mockStore(initialState);
describe('Testing OpenAudioBook component', () => {
    let props = {
        closeAudioBookDialog : false,
        audioData: {},
        closeAudioBookDialog: function(){},
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
    let narrativeAudioInstance = narrativeAudio.find('OpenAudioBook').instance();
    const spyProcessConfirmation = jest.spyOn(narrativeAudioInstance, 'processConfirmation')

    test('renders without crashing', () => {
        expect(narrativeAudio).toHaveLength(1);
        let instance = narrativeAudio.instance(); 
        expect(instance).toBeDefined();
    })
    it('onClick-default case', () => {
        narrativeAudioInstance.processConfirmation("test");
        narrativeAudioInstance.forceUpdate();
        narrativeAudio.update();
        expect(spyProcessConfirmation).toHaveBeenCalled()
        spyProcessConfirmation.mockClear()
    })
})