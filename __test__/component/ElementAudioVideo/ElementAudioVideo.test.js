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
        
            expect(component).toMatchSnapshot();
        })

        test('renders  properly with given audio element', () => {
            props = {
                model: audioElementWithData
            };
            component.setProps({ model: audioElementWithData });
           
            expect(component).toMatchSnapshot();
        })
    });
    describe('With Video element', () => {
        let props = {
            model: videoElementDefault
        };
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default video element', () => {
           
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given video element', () => {
            props = {
                model: videoElementWithData
            };
            component.setProps({ element: videoElementWithData });
            
            expect(component).toMatchSnapshot();
        })

    });
    describe('Testing Element  component with props', () => {
        let type = "figure";
        const elementAudioVideo = mount(<ElementAudioVideo type={type} />);
        let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        it('render Element component ', () => {  
            console.log(elementAudioVideo.debug());
            expect(elementAudioVideo).toMatchSnapshot();
        })
    
        it('onClick', () => {
            elementAudioVideoInstance.onClick();
        })
        it('onBlur', () => {
            elementAudioVideoInstance.onBlur();
        })
        it('onKeyup', () => {
            elementAudioVideoInstance.onKeyup();
        })
    
        it('onFocus', () => {
            elementAudioVideoInstance.onFocus();
        })
    })
});