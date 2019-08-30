import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementAudioVideo } from '../../../src/component/ElementAudioVideo/ElementAudioVideo';
import { audioElementDefault, audioElementWithData, videoElementDefault, videoElementWithData } from '../../../fixtures/ElementAudioVideoTestingData.js'
describe('Testing Element Audio-Video component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementAudioVideo element={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    describe('With Audio element', () => {
        let props = {
            element: audioElementDefault
        };
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default audio element', () => {
            component.find('div.pearson-component').simulate('click');
            expect(component).toMatchSnapshot();
        })

        test('renders  properly with given audio element', () => {
            props = {
                element: audioElementWithData
            };
            component.setProps({ element: audioElementWithData });
            component.find('div.pearson-component').simulate('click');
            expect(component).toMatchSnapshot();
        })
    });
    describe('With Video element', () => {
        let props = {
            element: videoElementDefault
        };
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default video element', () => {
            component.find('div.pearson-component').simulate('click');
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given video element', () => {
            props = {
                element: videoElementWithData
            };
            component.setProps({ element: videoElementWithData });
            component.find('div.pearson-component').simulate('click');
            expect(component).toMatchSnapshot();
        })

    });
});