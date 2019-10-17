import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementAudioVideo } from '../../../src/component/ElementAudioVideo/ElementAudioVideo';
import { audioElementTypeSLDefault, audioElementTypeSLWithData, audioElementTypeAlfrescoDefault, audioElementTypeAlfrescoWithData, videoElementTypeSLDefault, videoElementTypeSLWithData, videoElementTypeAlfrescoWithData, videoElementTypeAlfrescoDefault } from '../../../fixtures/ElementAudioVideoTestingData.js'
describe('Testing Element Audio-Video component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        let props = {
            model:{},
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function(){}
        }
        ReactDOM.render(<ElementAudioVideo {...props}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    describe('With Audio element', () => {
        let props = {
            model: audioElementTypeSLDefault,
            index: 1,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function(){}
        };
        const div = document.createElement('div');
        let component = mount(<ElementAudioVideo {...props} />);
        test('renders properly with default audio SL-type element', () => {        
            
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
           
        })
        test('renders  properly with given audio SL-type  element', () => {
            component.setProps({ model: audioElementTypeSLWithData,index: 2 });
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoDefault,index: 3 });
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with given audio Alfresco-type element', () => {
            component.setProps({ model: audioElementTypeAlfrescoWithData ,index:4 });
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('With Video element', () => {
        let props = {
            model: videoElementTypeSLDefault,
            index: 5,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function(){}
        };
        let component = mount(<ElementAudioVideo {...props} />);
        const div = document.createElement('div');
        test('renders properly with default video SL-type element', () => {
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with given video SL-type element', () => {
            component.setProps({ model: videoElementTypeSLWithData,index: 6 });
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoDefault ,index: 7});
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with given video Alfresco-type element', () => {
            component.setProps({ model: videoElementTypeAlfrescoWithData,index: 8 });
            ReactDOM.render(<ElementAudioVideo {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })

    });
    describe('Testing Element  component with props', () => {
        let type = "figure";
  
        const elementAudioVideo = mount(<ElementAudioVideo type={type} />);
        let elementAudioVideoInstance = elementAudioVideo.find('ElementAudioVideo').instance();
        const mockLoginfn = jest.fn();
        it('onClick', () => {
            elementAudioVideoInstance.handleC2MediaClick(e);
        }) 
       
        it('Simulating alfresco click without alfresco location', () =>{
            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            elementAudioVideo.find('ElementAudioVideo').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
        })
        it('Simulating alfresco click with alfresco location', () =>{
            const elementAudioVideo = mount( <ElementAudioVideo {...props} /> )
            config.alfrescoMetaData = {nodeRef : {}}
            elementAudioVideo.find('ElementAudioVideo').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
        })
        it('Alfresco Data Handling', () => {
            const elementAudioVideo = mount(<ElementAudioVideo {...props} />, { attachTo: document.body })
            elementAudioVideo.find('ElementAudioVideo').instance().dataFromAlfresco({ assetType: "video" })
        })   
        // it('onFocus', () => {
        //     let wrapper;
        //     wrapper = shallow(<ElementAudioVideo {...props} />)
        // })
        // it('onBlur', () => {
        //     let wrapper;
        //     wrapper = shallow(<ElementAudioVideo {...props} handleBlur={mockLoginfn}/>)
        // })
    })
});