import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import {ElementFigure} from '../../../src/component/ElementFigure/ElementFigure';
import { figureImage50TextElement, figureImageTextWidthElement, figureImageWiderElement, figureImageFullElement, tableImage50TextElement, tableImageTextWidthElement, tableImageWiderElement, tableImageFullElement, mathImage50TextElement, mathImageTextWidthElement, mathImageWiderElement, mathImageFullElement, mathmlElement, blockCodeElement } from '../../../fixtures/ElementFigureTestingData.js'

describe('Testing Figure element component', () => {
     
    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ElementFigure element={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            element: figureImage50TextElement
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with figureImage-50% Text', () => {
        
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with figureImage-TextWidth', () => {
            props = {
                element: figureImageTextWidthElement
            };
            component.setProps({element: figureImageTextWidthElement} );
        
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with figureImage-Wider than Text', () => {
            component.setProps({ element: figureImageWiderElement });
           
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with figureImage-Fullscreen', () => {
            component.setProps({ element: figureImageFullElement });
            
            expect(component).toMatchSnapshot();
        })
    });
    describe('With table image element', () => {
        let props = {
            element: tableImage50TextElement
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with tableImage-50% Text', () => {
          
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with tableImage-TextWidth', () => {
            component.setProps({ element: tableImageTextWidthElement });
        
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with tableImage-Wider than Text', () => {
            component.setProps({ element: tableImageWiderElement });
         
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with tableImage-Fullscreen', () => {
            component.setProps({ element: tableImageFullElement });
       
            expect(component).toMatchSnapshot();
        })
    });
    describe('With math image element', () => {
        let props = {
            element: mathImage50TextElement
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with mathImage-50% Text', () => {
          
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mathImage-TextWidth', () => {
            component.setProps({ element: mathImageTextWidthElement });
         
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mathImage-Wider than Text', () => {
            component.setProps({ element: mathImageWiderElement });
           
            expect(component).toMatchSnapshot();
        })
        test('renders  properly with mathImage-Fullscreen', () => {
            component.setProps({ element: mathImageFullElement });
       
            expect(component).toMatchSnapshot();
        })
    });
    describe('With mathML element', () => {
        let props = {
            element: mathmlElement
        };
        let component = mount(<ElementFigure {...props} />);
        test('renders properly with mathML', () => {
           
            expect(component).toMatchSnapshot();
        })
        });
        describe('With block code editor element', () => {
            let props = {
                element: blockCodeElement
            };
            let component = mount(<ElementFigure {...props} />);
            test('renders properly with mathML', () => {
         
                expect(component).toMatchSnapshot();
            })
            });
});