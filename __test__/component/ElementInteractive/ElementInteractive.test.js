import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import Interactive from '../../../src/component/ElementInteractive';
import { Interactivefpo , InteractiveFlashcards, Interactive3party, Interactivepdf, InteractiveWeblink,
    InteractivePopupWeblink, InteractiveTable,InteractiveShowHide,InteractivePopWindow,Interactivegraph
    ,Interactivesimulation,Interactivesurvey,Interactivetimeline,Interactivehotspot,Interactiveaccountingtable,
    Interactivefillinblank,Interactivegalleryimage,Interactivegalleryvideo,Interactivevideomcq,Interactivemcq } from '../../../fixtures/ElementInteractiveTesting.js'

xdescribe('Testing Interactive element component', () => {
    test('renders without crashing', () => {
        const props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            model: {},
            handleFocus: function () { }
        }
        const div = document.createElement('div');
        ReactDOM.render(<Interactive {...props} />, div);
        ReactDOM.unmountComponentAtNode(div);
    })
    describe('With figure image element', () => {
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            index: 1
        };
        let component = mount(<Interactive {...props} />);
        const div = document.createElement('div');
        test('renders  properly with default fpo', () => {
            component.setProps({ model: Interactivefpo, index: 3 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractiveFlashcards', () => {
          
            component.setProps({ model: InteractiveFlashcards,index: 5 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactive3party ', () => {
           
            component.setProps({ model: Interactive3party ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivepdf ', () => {
           
            component.setProps({ model: Interactivepdf ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractiveWeblink ', () => {
           
            component.setProps({ model: InteractiveWeblink ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractivePopupWeblink ', () => {
           
            component.setProps({ model: InteractivePopupWeblink ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractiveTable ', () => {
           
            component.setProps({ model: InteractiveTable ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractiveShowHide ', () => {
           
            component.setProps({ model: InteractiveShowHide ,index: 7});
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default InteractivePopWindow', () => {
           
            component.setProps({ model: InteractivePopWindow,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivegraph', () => {
           
            component.setProps({ model: Interactivegraph,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivesimulation', () => {
           
            component.setProps({ model: Interactivesimulation,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivesurvey', () => {
           
            component.setProps({ model: Interactivesurvey,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivetimeline', () => {
           
            component.setProps({ model: Interactivetimeline,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivehotspot', () => {
           
            component.setProps({ model: Interactivehotspot,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactiveaccountingtable', () => {
           
            component.setProps({ model: Interactiveaccountingtable,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivefillinblank', () => {
           
            component.setProps({ model: Interactivefillinblank,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivegalleryimage', () => {
           
            component.setProps({ model: Interactivegalleryimage,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivegalleryvideo', () => {
           
            component.setProps({ model: Interactivegalleryvideo,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivevideomcq', () => {
           
            component.setProps({ model: Interactivevideomcq,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
        test('renders  properly with default Interactivemcq', () => {
           
            component.setProps({ model: Interactivemcq,index: 8 });
            ReactDOM.render(<Interactive {...props} />, div);
            ReactDOM.unmountComponentAtNode(div);
        })
    });
    describe('Testing Element interactive component with props', () => {
        let type = "interactive";
        let props = {
            slateLockInfo: {
                isLocked: false,
                userId: 'c5Test01'
            },
            handleFocus: function () { }
        };
        let wrapper;
        const elementInteractive = mount(<Interactive type={type} model={Interactivefpo} index="1" {...props} />);
        let elementInteractiveInstance = elementInteractive.find('Interactive').instance();
        const mockLoginfn = jest.fn();
        it('onClick', () => {
            elementInteractiveInstance.togglePopup(true);
        })    
        it('onFocus', () => {
            wrapper = shallow(<Interactive {...props} handleEditorFocus={mockLoginfn}/>)
        })
        it('setstate', () => {
            elementInteractiveInstance.setState({
                showAssesmentpopup: true
            });
        })
    })
});