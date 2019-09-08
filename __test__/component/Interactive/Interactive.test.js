import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Interactive from '../../../src/component/Interactive/Interactive';
import { Interactivefpo , InteractiveFlashcards, Interactive3party, Interactivepdf, InteractiveWeblink,
    InteractivePopupWeblink, InteractiveTable,InteractiveShowHide,InteractivePopWindow} from '../../../fixtures/ElementInteractiveTesting.js'

describe('Testing Interactive element component', () => {

    test('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Interactive model={{}} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            model: Interactivefpo,
            index: 1
        };
        let component = mount(<Interactive {...props} />);
        test('renders properly with default fpo ', () => {

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default fpo', () => {
         
            component.setProps({ model: Interactivefpo ,index: 3});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractiveFlashcards', () => {
          
            component.setProps({ model: InteractiveFlashcards,index: 5 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactive3party ', () => {
           
            component.setProps({ model: Interactive3party ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivepdf ', () => {
           
            component.setProps({ model: Interactivepdf ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractiveWeblink ', () => {
           
            component.setProps({ model: InteractiveWeblink ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractivePopupWeblink ', () => {
           
            component.setProps({ model: InteractivePopupWeblink ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractiveTable ', () => {
           
            component.setProps({ model: InteractiveTable ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractiveShowHide ', () => {
           
            component.setProps({ model: InteractiveShowHide ,index: 7});

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default InteractivePopWindow', () => {
           
            component.setProps({ model: InteractivePopWindow,index: 8 });

            expect(component).toMatchSnapshot();
        })
    });
});