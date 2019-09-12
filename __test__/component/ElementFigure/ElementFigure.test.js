import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementFigure } from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage50TextElementDefault,figureImage50TextElementWithData, figureImageTextWidthElementDefault,figureImageTextWidthElementWithData, figureImageWiderElementDefault,figureImageWiderElementWithData, figureImageFullElementDefault,figureImageFullElementWithData,tableImage50TextElementDefault,tableImage50TextElementWithData,tableImageTextWidthElementDefault,tableImageTextWidthElementWithData,tableImageWiderElementDefault,tableImageWiderElementWithData,tableImageFullElementDefault,tableImageFullElementWithData, mathImage50TextElementDefault,mathImage50TextElementWithData,mathImageTextWidthElementDefault,mathImageTextWidthElementWithData,mathImageWiderElementDefault,mathImageWiderElementWithData,mathImageFullElementDefault,mathImageFullElementWithData, mathmlEditorDefault,mathmlEditorWithData,blockCodeEditorDefault,blockCodeEditorWithData } from '../../../fixtures/ElementFigureTestingData.js'

describe('Testing Figure element component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementFigure model={{}}  index="" />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            model: figureImage50TextElementDefault,
            index: 1
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default figureImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-50% Text', () => {

            component.setProps({ model: figureImage50TextElementWithData ,index: 2});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-TextWidth', () => {
         
            component.setProps({ model: figureImageTextWidthElementDefault ,index: 3});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-TextWidth', () => {
          
            component.setProps({ model: figureImageTextWidthElementWithData ,index: 4});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementDefault,index: 5 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementWithData,index: 6 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementDefault ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementWithData,index: 8 });

            expect(component).toMatchSnapshot();
        })
    });
    describe('With table image element', () => {
        let props = {
            model: tableImage50TextElementDefault,
            index: 9
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default tableImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData ,index:10});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementDefault ,index:11});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementWithData ,index:12});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementDefault ,index:13});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementWithData,index:14 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementDefault,index:15 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementWithData ,index:16});

            expect(component).toMatchSnapshot();
        })
    });
    describe('With math image element', () => {
        let props = {
            model: mathImage50TextElementDefault,
            index:17
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default mathImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementWithData,index:18 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementDefault ,index:19});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementWithData,index: 20});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementDefault,index:21 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementWithData ,index:22});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementDefault ,index:23});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementWithData ,index:24});

            expect(component).toMatchSnapshot();
        })
    });
    describe('With mathML element', () => {
        let props = {
            model: mathmlEditorDefault,
            index:25
            
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default mathML', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathML', () => {
            component.setProps({ model: mathmlEditorWithData ,index:26});

            expect(component).toMatchSnapshot();
        })
    });
    describe('With block code editor element', () => {
        let props = {
            model: blockCodeEditorDefault,
            index:27
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default blockCodeEditor', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data blockCodeEditor', () => {
            component.setProps({ model: blockCodeEditorWithData,index: 28});

            expect(component).toMatchSnapshot();
        })
    });
    describe('Testing Element figure component with props', () => {
        let type = "figure";
        const elementFigure = mount(<ElementFigure type={type} model={figureImage50TextElementDefault} index="30" />);
        let elementFigureInstance = elementFigure.find('ElementFigure').instance();
        it('onClick', () => {
            elementFigureInstance.onClick();
        })
        it('onBlur', () => {
            elementFigureInstance.onBlur();
        })
        it('onKeyup', () => {
            elementFigureInstance.onKeyup();
        })
    
        it('onFocus', () => {
            elementFigureInstance.onFocus();
        })
    })
    
});