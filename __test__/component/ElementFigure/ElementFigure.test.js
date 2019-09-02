import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { ElementFigure } from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage50TextElementDefault,figureImage50TextElementWithData, figureImageTextWidthElementDefault,figureImageTextWidthElementWithData, figureImageWiderElementDefault,figureImageWiderElementWithData, figureImageFullElementDefault,figureImageFullElementWithData,tableImage50TextElementDefault,tableImage50TextElementWithData,tableImageTextWidthElementDefault,tableImageTextWidthElementWithData,tableImageWiderElementDefault,tableImageWiderElementWithData,tableImageFullElementDefault,tableImageFullElementWithData, mathImage50TextElementDefault,mathImage50TextElementWithData,mathImageTextWidthElementDefault,mathImageTextWidthElementWithData,mathImageWiderElementDefault,mathImageWiderElementWithData,mathImageFullElementDefault,mathImageFullElementWithData, mathmlEditorDefault,mathmlEditorWithData,blockCodeEditorDefault,blockCodeEditorWithData } from '../../../fixtures/ElementFigureTestingData.js'

describe('Testing Figure element component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementFigure model={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            model: figureImage50TextElementDefault
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default figureImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-50% Text', () => {

            component.setProps({ model: figureImage50TextElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-TextWidth', () => {
         
            component.setProps({ model: figureImageTextWidthElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-TextWidth', () => {
          
            component.setProps({ model: figureImageTextWidthElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-Wider than Text', () => {
          
            component.setProps({ model: figureImageWiderElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data figureImage-Fullscreen', () => {
           
            component.setProps({ model: figureImageFullElementWithData });

            expect(component).toMatchSnapshot();
        })
    });
    describe('With table image element', () => {
        let props = {
            model: tableImage50TextElementDefault
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default tableImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-50% Text', () => {
            component.setProps({ model: tableImage50TextElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-TextWidth', () => {
            component.setProps({ model: tableImageTextWidthElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-Wider than Text', () => {
            component.setProps({ model: tableImageWiderElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data tableImage-Fullscreen', () => {
            component.setProps({ model: tableImageFullElementWithData });

            expect(component).toMatchSnapshot();
        })
    });
    describe('With math image element', () => {
        let props = {
            model: mathImage50TextElementDefault
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default mathImage-50% Text', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-50% Text', () => {
            component.setProps({ model: mathImage50TextElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-TextWidth', () => {
            component.setProps({ model: mathImageTextWidthElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-Wider than Text', () => {
            component.setProps({ model: mathImageWiderElementWithData });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementDefault });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathImage-Fullscreen', () => {
            component.setProps({ model: mathImageFullElementWithData });

            expect(component).toMatchSnapshot();
        })
    });
    describe('With mathML element', () => {
        let props = {
            model: mathmlEditorDefault
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default mathML', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data mathML', () => {
            component.setProps({ model: mathmlEditorWithData });

            expect(component).toMatchSnapshot();
        })
    });
    describe('With block code editor element', () => {
        let props = {
            model: blockCodeEditorDefault
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with default blockCodeEditor', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mock data blockCodeEditor', () => {
            component.setProps({ model: blockCodeEditorWithData });

            expect(component).toMatchSnapshot();
        })
    });
    describe('Testing Element figure component with props', () => {
        let type = "figure";
        const elementFigure = mount(<ElementFigure type={type} model={figureImage50TextElementDefault} />);
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