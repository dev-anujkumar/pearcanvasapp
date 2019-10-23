import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementFigure } from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage50TextElementDefault,figureImage50TextElementWithData, figureImageTextWidthElementDefault,figureImageTextWidthElementWithData, figureImageWiderElementDefault,figureImageWiderElementWithData, figureImageFullElementDefault,figureImageFullElementWithData,tableImage50TextElementDefault,tableImage50TextElementWithData,tableImageTextWidthElementDefault,tableImageTextWidthElementWithData,tableImageWiderElementDefault,tableImageWiderElementWithData,tableImageFullElementDefault,tableImageFullElementWithData, mathImage50TextElementDefault,mathImage50TextElementWithData,mathImageTextWidthElementDefault,mathImageTextWidthElementWithData,mathImageWiderElementDefault,mathImageWiderElementWithData,mathImageFullElementDefault,mathImageFullElementWithData, mathmlEditorDefault,mathmlEditorWithData,blockCodeEditorDefault,blockCodeEditorWithData } from '../../../fixtures/ElementFigureTestingData.js'
import config from '../../../src/config/config';

describe('Testing Figure element component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        let props = {
            model:figureImage50TextElementWithData,
            index:"" ,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: []
        }
        ReactDOM.render(<ElementFigure  {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            model: figureImage50TextElementDefault,
            index: 1,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: []
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default figureImage-50% Text', () => {
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data figureImage-50% Text', () => {

            component.setProps({ model: figureImage50TextElementWithData ,index: 2});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default figureImage-TextWidth', () => {
         
            component.setProps({ model: figureImageTextWidthElementDefault ,index: 3});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data figureImage-TextWidth', () => {
          
            component.setProps({ model: figureImageTextWidthElementWithData ,index: 4});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementDefault,index: 5 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementWithData,index: 6 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementDefault ,index: 7});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementWithData,index: 8 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('With table image element', () => {
        let props = {
            model: tableImage50TextElementDefault,
            index: 9,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: []
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default tableImage-50% Text', () => {
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData ,index:10});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementDefault ,index:11});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementWithData ,index:12});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementDefault ,index:13});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
  
        })
        test('renders  properly with mock data tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementWithData,index:14 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementDefault,index:15 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementWithData ,index:16});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('With math image element', () => {
        let props = {
            model: mathImage50TextElementDefault,
            index:17,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: []
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default mathImage-50% Text', () => {
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementWithData,index:18 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementDefault ,index:19});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementWithData,index: 20});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementDefault,index:21 });
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementWithData ,index:22});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementDefault ,index:23});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementWithData ,index:24});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('With mathML element', () => {
        let props = {
            model: mathmlEditorDefault,
            index:25,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: []
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default mathML', () => {
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data mathML', () => {
            component.setProps({ model: mathmlEditorWithData ,index:26});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('With block code editor element', () => {
        let props = {
            model: blockCodeEditorDefault,
            index:27,
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            permissions: function(){}
        };
        let component = mount(<ElementFigure {...props} />);
        const div = document.createElement('div');
        test('renders properly with default blockCodeEditor', () => {
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with mock data blockCodeEditor', () => {
            component.setProps({ model: blockCodeEditorWithData,index: 28});
            ReactDOM.render(<ElementFigure {...props}/>, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('Testing Element figure component with props', () => {
        let type = "figure";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            onClick : ()=>{},
            handleFocus: function(){},
            permissions: []
        };
        const elementFigure = mount(<ElementFigure type={type} model={figureImage50TextElementDefault} index="30" {...props}/>);
        let elementFigureInstance = elementFigure.find('ElementFigure').instance();
        it('onClick', () => {
            elementFigureInstance.handleC2MediaClick({target : {tagName : 'g'}});
        }) 
       
        it('Simulating alfresco click without alfresco location', () =>{
            const elementFigure = mount( <ElementFigure {...props} /> )
            elementFigure.find('ElementFigure').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
        })
        it('Simulating alfresco click with alfresco location', () =>{
            const elementFigure = mount( <ElementFigure {...props} /> )
            config.alfrescoMetaData = {nodeRef : {}}
            elementFigure.find('ElementFigure').instance().handleC2MediaClick({target : {tagName : 'b'}}) 
        })
        it('Alfresco Data Handling', () => {
            const elementFigure = mount(<ElementFigure {...props} />, { attachTo: document.body })
            elementFigure.find('ElementFigure').instance().dataFromAlfresco({ assetType: "figure" })
        })   
    })
    
});