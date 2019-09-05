import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementAudioVideo } from '../../../src/component/ElementAudioVideo/ElementAudioVideo';
import { audioElementTypeSLDefault, audioElementTypeSLWithData, audioElementTypeAlfrescoDefault, audioElementTypeAlfrescoWithData, videoElementTypeSLDefault, videoElementTypeSLWithData, videoElementTypeAlfrescoWithData, videoElementTypeAlfrescoDefault } from '../../../fixtures/ElementAudioVideoTestingData.js'
describe('Testing Element Audio-Video component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementAudioVideo element={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    describe('With Audio element', () => {
        let props = {
            element: audioElementTypeSLDefault
        };
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default audio SL-type element', () => {
        
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given audio SL-type  element', () => {
            component.setProps({ model: audioElementTypeSLWithData });
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoDefault });
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoWithData });
            expect(component).toMatchSnapshot();
        })
    });
    describe('With Video element', () => {
        let props = {
            model: videoElementTypeSLDefault
        };
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default video SL-type element', () => {
           
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given video SL-type element', () => {
            component.setProps({ element: videoElementTypeSLWithData });
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default video Alfresco-type element', () => {
            component.setProps({ element: videoElementTypeAlfrescoDefault });
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with given video Alfresco-type element', () => {
            component.setProps({ element: videoElementTypeAlfrescoWithData });
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