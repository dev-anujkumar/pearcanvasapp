import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Interactive from '../../../src/component/ElementInteractive';
import { Interactivefpo , InteractiveFlashcards, Interactive3party, Interactivepdf, InteractiveWeblink,
    InteractivePopupWeblink, InteractiveTable,InteractiveShowHide,InteractivePopWindow,Interactivegraph
    ,Interactivesimulation,Interactivesurvey,Interactivetimeline,Interactivehotspot,Interactiveaccountingtable,
    Interactivefillinblank,Interactivegalleryimage,Interactivegalleryvideo,Interactivevideomcq,Interactivemcq } from '../../../fixtures/ElementInteractiveTesting.js'

describe('Testing Interactive element component', () => {
    test('renders without crashing', () => {
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: {}
        }
        const div = document.createElement('div');
        ReactDOM.render(<Interactive {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    xdescribe('With figure image element', () => {
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
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


        test('renders  properly with default Interactivegraph', () => {
           
            component.setProps({ model: Interactivegraph,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivesimulation', () => {
           
            component.setProps({ model: Interactivesimulation,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivesurvey', () => {
           
            component.setProps({ model: Interactivesurvey,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivetimeline', () => {
           
            component.setProps({ model: Interactivetimeline,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivehotspot', () => {
           
            component.setProps({ model: Interactivehotspot,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactiveaccountingtable', () => {
           
            component.setProps({ model: Interactiveaccountingtable,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivefillinblank', () => {
           
            component.setProps({ model: Interactivefillinblank,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivegalleryimage', () => {
           
            component.setProps({ model: Interactivegalleryimage,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivegalleryvideo', () => {
           
            component.setProps({ model: Interactivegalleryvideo,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivevideomcq', () => {
           
            component.setProps({ model: Interactivevideomcq,index: 8 });

            expect(component).toMatchSnapshot();
        })
        test('renders  properly with default Interactivemcq', () => {
           
            component.setProps({ model: Interactivemcq,index: 8 });

            expect(component).toMatchSnapshot();
        })
    });
    xdescribe('Testing Element interactive component with props', () => {
        let type = "interactive";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            }
        };
        const elementInteractive = mount(<Interactive type={type} model={Interactivefpo} index="1" {...props} />);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        it('onClick', () => {
            elementInteractiveInstance.onClick();
        })
        it('onBlur', () => {
            elementInteractiveInstance.onBlur();
        })
        it('onKeyup', () => {
            elementInteractiveInstance.onKeyup();
        })
    
        it('onFocus', () => {
            elementInteractiveInstance.onFocus();
        })
    })
});